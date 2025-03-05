import { styled } from '@linaria/react';
import React from 'react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Button } from 'antd';
import { Auth } from '../../library/supabase/auth';
import authLocalization from '../../library/supabase/authLocalization';
import { supabase } from '../../library/supabase';

interface Props {
  onAuthDetail: () => void;
}

const Splash = ({ onAuthDetail }: Props) => {
  return (
    <Layout>
      <Content>
        <Title>소데클,</Title>
        <Description>일상에 색을 더하자</Description>
      </Content>
      <Footer>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={['discord']}
          localization={authLocalization}
          redirectTo={window.location.origin}
          onlyThirdPartyProviders
        />
        <Button type="text" style={{ color: '#fff' }} onClick={() => onAuthDetail()}>
          다른 방법으로 로그인
        </Button>
      </Footer>
    </Layout>
  );
};

const Layout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Title = styled.span`
  font-size: 24px;
`;
const Description = styled.span`
  font-size: 24px;
`;

const Footer = styled.div`
  width: 100%;
  text-align: center;
  font-size: 14px;
`;

export default Splash;
