import { styled } from '@linaria/react';
import { Avatar } from 'antd';
import { UserRound } from 'lucide-react';
import React from 'react';

interface AvatarProp {
  isVisible: boolean;
  src?: string;
  onClick?: () => void;
}

type Props = {
  title?: string;
  RightComponent?: React.ReactNode;
} & (
  | {
      avatar?: AvatarProp;
      LeftComponent?: never;
      CenterComponent?: never;
    }
  | {
      avatar?: never;
      LeftComponent?: React.ReactNode;
      CenterComponent?: never;
    }
  | {
      avatar?: AvatarProp;
      LeftComponent?: never;
      CenterComponent?: React.ReactNode;
    }
);

const Header = ({ title, avatar = { isVisible: false }, CenterComponent, LeftComponent, RightComponent }: Props) => {
  const { isVisible, src, onClick } = avatar;

  return (
    <Container>
      <LeftSection>
        {LeftComponent || (
          <Avatar
            size="large"
            style={{
              alignItems: 'center',
              backgroundColor: '#4B5563',
              color: '#D1D5DB',
              cursor: onClick ? 'pointer' : 'default',
              display: 'flex',
              justifyContent: 'center',
              visibility: isVisible ? 'visible' : 'hidden',
            }}
            icon={<UserRound />}
            src={src}
            onClick={onClick}
          />
        )}
        <Title>{title}</Title>
      </LeftSection>
      {CenterComponent && <CenterSection>{CenterComponent}</CenterSection>}
      <RightSection>{RightComponent}</RightSection>
    </Container>
  );
};

const Title = styled.div`
  color: white;
  flex: 1 0 auto;
  font-size: 24px;
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const CenterSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

const Container = styled.div`
  position: relative;
  padding: 16px 16px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
`;

export default Header;
