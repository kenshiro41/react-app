import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { MAIN_COLOR } from '../util/theme';
import LinkButton from '../components/atoms/LinkButton';
import styled from 'styled-components';

const Spacer = styled.span`
  margin: 20px;
`;

const NotFound: NextPage = () => {
  const [hidden, setHidden] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setHidden(false);
    }, 3000);
  }, []);

  return hidden ? (
    <div></div>
  ) : (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center',
        paddingTop: '2rem',
      }}
    >
      <div>
        <h3 style={{ color: MAIN_COLOR, padding: '10%' }}>
          This Page is Outside the Application
        </h3>
        Please back
        <p>
          <Spacer>
            <LinkButton onClick={() => router.back()}>here</LinkButton>
          </Spacer>
          or
          <Spacer>
            <LinkButton onClick={() => router.push('/')}>home</LinkButton>
          </Spacer>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
