import styled from '@emotion/styled';
import { Modal, message } from 'antd';
import { useAtomValue } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import * as COLOR from '../../../../../../config/color';
import { Query } from '../../../../../../hook';
import { UserStore } from '../../../../../../store';

type Props = {
  stockId: string;
};

const DrawStockInfo = ({ stockId }: Props) => {
  const supabaseSession = useAtomValue(UserStore.supabaseSession);
  const userId = supabaseSession?.user.id;

  const { user } = Query.Stock.useUser({ stockId, userId });
  const { mutateAsync: drawStockInfo, isLoading } = Query.Stock.useDrawStockInfo();
  const { allSellPrice } = Query.Stock.useAllSellPrice({ stockId, userId });

  const [open, setOpen] = useState(false);
  const modalRef = useRef<HTMLUListElement>(null);
  const [messageApi, contextHolder] = message.useMessage();
  const { data: stock, timeIdx } = Query.Stock.useQueryStock(stockId);

  const onClickDrawStockInfo = () => {
    if (!userId) return;
    drawStockInfo({
      stockId,
      userId,
    })
      .then(() => {
        messageApi.destroy();
        messageApi.open({
          content: '뽑기에 성공하였습니다',
          duration: 2,
          type: 'success',
        });
        setOpen(false);
      })
      .catch((reason: Error) => {
        messageApi.destroy();
        messageApi.open({
          content: `${reason.message}`,
          duration: 2,
          type: 'error',
        });
      });
  };

  useEffect(() => {
    if (open && modalRef.current) {
      modalRef.current.focus();
    }
  }, [open]);

  if (!stock || !userId) {
    return <>불러오는 중</>;
  }

  const allPrice = allSellPrice + (user?.money ?? 0);
  const isDisabled = timeIdx === undefined || timeIdx >= 7 || !stock.isTransaction || allPrice < 1000000;

  return (
    <>
      {contextHolder}
      <InfoExtractButton onClick={() => setOpen(true)} disabled={isDisabled}>
        정보 뽑기
      </InfoExtractButton>
      <div
        css={{
          position: 'absolute',
        }}
      >
        <Modal
          title="주식 정보 뽑기"
          open={open}
          centered
          onCancel={() => setOpen(false)}
          okText="뽑기"
          cancelText="닫기"
          getContainer={false}
          okButtonProps={{ loading: isLoading, style: { backgroundColor: COLOR.green } }}
          cancelButtonProps={{ style: { backgroundColor: '#252836', color: 'white' } }}
          onOk={onClickDrawStockInfo}
        >
          <InfoExtractionRulesList ref={modalRef} tabIndex={-1}>
            <li>
              <h3>1. 정보 뽑기 비용</h3>
              <p>
                1회 뽑는 데 <HighlightedText>30만원</HighlightedText>의 금액이 필요해요.
              </p>
            </li>
            <li>
              <h3>2. 정보 뽑기 조건</h3>
              <p>
                <HighlightedText>수익률 0% 이상</HighlightedText>일 때만 뽑기를 할 수 있어요.
              </p>
            </li>
          </InfoExtractionRulesList>
        </Modal>
      </div>
    </>
  );
};

const InfoExtractionRulesList = styled.ul`
  list-style: none;
  font-size: 12px;
  color: #9ca3af;
  padding: 3px 0;

  & > li > h3 {
    font-size: 15px;
    color: rgba(255, 255, 255, 0.8);
  }
`;
const HighlightedText = styled.span`
  color: ${COLOR.pastelGreen};
`;

const InfoExtractButton = styled.button`
  width: 100%;
  font-family: 'DungGeunMo';
  padding: 16px;
  height: 56px;
  border-radius: 4px;
  background-color: ${COLOR.green};
  color: white;
  font-size: 14px;
  border: none;
  &:hover > span {
    color: white;
  }
  &:disabled {
    opacity: 50%;
    cursor: not-allowed;
  }
`;

export default DrawStockInfo;
