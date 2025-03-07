import { Injectable, Inject } from '@nestjs/common';
import {
  SQSClient,
  SendMessageCommand,
  ReceiveMessageCommand,
  DeleteMessageCommand,
  Message,
} from '@aws-sdk/client-sqs';
import { ConfigService } from '@nestjs/config';
import { SqsMessage, SqsOptions } from './sqs.types';

@Injectable()
export class SqsService {
  private sqsClient: SQSClient;

  private queueUrl: string;

  constructor(private configService: ConfigService, @Inject('SQS_OPTIONS') private options: SqsOptions) {
    this.sqsClient = new SQSClient({
      region: this.options.region || this.configService.get<string>('AWS_REGION', 'ap-northeast-2'),
    });
    this.queueUrl = this.options.queueUrl || this.configService.get<string>('AWS_SQS_QUEUE_URL', '');
  }

  async sendMessage<T>(action: string, data: T): Promise<string> {
    const message: SqsMessage<T> = {
      action,
      data,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };

    const command = new SendMessageCommand({
      MessageBody: JSON.stringify(message),
      QueueUrl: this.queueUrl,
    });

    const response = await this.sqsClient.send(command);
    return response.MessageId || '';
  }

  async receiveMessages(maxMessages = 1): Promise<Message[]> {
    try {
      const command = new ReceiveMessageCommand({
        AttributeNames: ['All'],
        MaxNumberOfMessages: maxMessages,
        MessageAttributeNames: ['All'],
        QueueUrl: this.queueUrl,
      });

      console.log(this.queueUrl);

      const response = await this.sqsClient.send(command);
      console.log(response);

      return response.Messages || [];
    } catch (error) {
      console.error('SQS 메시지 수신 오류:', error);
      throw error;
    }
  }

  async deleteMessage(receiptHandle: string): Promise<void> {
    const command = new DeleteMessageCommand({
      QueueUrl: this.queueUrl,
      ReceiptHandle: receiptHandle,
    });

    await this.sqsClient.send(command);
  }
}
