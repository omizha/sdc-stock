import { Avatar, Modal } from 'antd';
import { ReactElement, cloneElement, useReducer } from 'react';
import styled from '@emotion/styled';
import { useRecommendedPartners } from '../../../../../../hook/query/Stock/useRecommendedPartners';
import * as COLOR from '../../../../../../config/color';

interface ButtonProps {
  onClick?: () => void;
}

interface Props {
  trigger: ReactElement<ButtonProps>;
  stockId: string | undefined;
}

const RecommendedPartnersModal = ({ trigger, stockId }: Props) => {
  const [isRecommendModalOpen, toggleRecommendModalOpen] = useReducer((state) => !state, false);
  const { partnerNicknames } = useRecommendedPartners(stockId);

  return (
    <>
      {cloneElement(trigger, { onClick: toggleRecommendModalOpen })}

      <Modal
        title="추천 대화상대"
        open={isRecommendModalOpen}
        onCancel={toggleRecommendModalOpen}
        centered
        footer={null}
      >
        <PartnerDescription>
          일부 <span>정보를 공유</span>하는 대화 상대를 발견했어요 👀
        </PartnerDescription>

        {partnerNicknames?.length === 0 ? (
          <PartnerDescription>라고 할 뻔.. 사실 발견 못했어요 😢</PartnerDescription>
        ) : (
          <PartnerList>
            {partnerNicknames.map((name) => (
              <PartnerItem key={name}>
                <Avatar size={40}>{name?.[0]}</Avatar>
                <span>{name}</span>
              </PartnerItem>
            ))}
          </PartnerList>
        )}
      </Modal>
    </>
  );
};

export default RecommendedPartnersModal;

const PartnerDescription = styled.p`
  font-size: 12px;
  color: #9ca3af;

  & > span {
    color: ${COLOR.pastelGreen};
  }
`;

const PartnerList = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  color: rgb(213, 213, 213);
  padding-left: 0px;
  font-size: 17px;
`;

const PartnerItem = styled.li`
  background-color: #2a2d3a;
  border-radius: 6px;
  padding: 8px;
  display: flex;
  align-items: center;
  column-gap: 16px;
`;
