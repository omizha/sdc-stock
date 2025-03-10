import React, { CSSProperties } from 'react';
import styled from '@emotion/styled';
import { ScrollView } from './ScrollView';

interface Props {
  children?: React.ReactNode;
  HeaderComponent?: React.ReactNode;
  justifyContent?: CSSProperties['justifyContent'];
  padding?: CSSProperties['padding'];
  backgroundColor?: CSSProperties['backgroundColor'];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ScrollViewComponent?: React.ComponentType<any>;
}

const MobileLayout = ({
  children,
  HeaderComponent,
  justifyContent = 'center',
  padding = '20px',
  backgroundColor = '',
  ScrollViewComponent = ScrollView,
}: Props) => {
  return (
    <Wrapper>
      <Content>
        {HeaderComponent}
        <TopScrollView
          style={{
            backgroundColor,
            justifyContent,
            padding,
          }}
        >
          <ScrollViewComponent>{children}</ScrollViewComponent>
        </TopScrollView>
      </Content>
    </Wrapper>
  );
};

export default MobileLayout;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #111827, #000000);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  height: 100%;
`;

const TopScrollView = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  /* 이걸 넣어야 내부 스크롤 가능 */
  min-height: 0;
`;
