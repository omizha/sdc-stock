import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { UserService } from 'feature-nest-stock';
import { SqsService, SqsMessage } from 'lib-nest-sqs';
import { StockUser } from 'feature-nest-stock/dist/user/user.schema';

@Injectable()
export class SqsConsumerService implements OnModuleInit {
  private readonly logger = new Logger(SqsConsumerService.name);

  constructor(private readonly sqsService: SqsService, private readonly userService: UserService) {}

  onModuleInit(): void {
    this.startConsumer();
  }

  private async startConsumer(): Promise<void> {
    this.logger.log('SQS Consumer 시작됨');

    try {
      await this.processMessages();
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`SQS Consumer 오류: ${error.message}`, error.stack);
      } else {
        this.logger.error(`SQS Consumer 오류: ${error}`);
      }
      // 오류 발생 시 잠시 대기 후 재시도
      setTimeout(() => this.startConsumer(), 5000);
    }
  }

  private async processMessages(): Promise<void> {
    // Lambda가 실행되면 한 번의 메시지 처리 후 종료
    const messages = await this.sqsService.receiveMessages(10);

    if (messages.length === 0) {
      this.logger.log('처리할 메시지가 없습니다.');
      return;
    }

    this.logger.log(`${messages.length}개의 메시지를.처리합니다.`);

    for (const message of messages) {
      try {
        if (!message.Body) {
          this.logger.warn('메시지 본문이 없습니다.');
          continue;
        }

        const sqsMessage = JSON.parse(message.Body) as SqsMessage;
        await this.handleMessage(sqsMessage);

        // 성공적으로 처리된 메시지 삭제
        await this.sqsService.deleteMessage(message.ReceiptHandle);
        this.logger.log(`메시지 처리 완료: ${sqsMessage.id}`);
      } catch (error) {
        if (error instanceof Error) {
          this.logger.error(`메시지 처리 중 오류 발생: ${error.message}`, error.stack);
        } else {
          this.logger.error(`메시지 처리 중 오류 발생: ${error}`);
        }
        // 특정 메시지 처리 실패 시 다른 메시지는 계속 처리
      }
    }
  }

  private async handleMessage(message: SqsMessage): Promise<void> {
    switch (message.action) {
      case 'registerUser':
        await this.handleUserRegistration(message.data as StockUser);
        break;
      default:
        this.logger.warn(`알 수 없는 액션: ${message.action}`);
    }
  }

  private async handleUserRegistration(userData: StockUser): Promise<void> {
    this.logger.log(`사용자 등록 처리: ${userData.userId} (${userData.stockId})`);
    await this.userService.registerUser(userData);
  }
}
