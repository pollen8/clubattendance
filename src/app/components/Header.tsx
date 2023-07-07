import React, { useContext } from 'react';
import styled from 'styled-components';
import useMedia from 'use-media';

import Button from '@bit/pollen8.fab-ui.button';
import Col from '@bit/pollen8.fab-ui.col';
import Container from '@bit/pollen8.fab-ui.container';
import Row from '@bit/pollen8.fab-ui.row';

import { UserContext } from '../../App';
import { auth } from '../../fire';
import { Menu } from './Menu';

const Avatar = styled.img`
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
`;

const Title = styled.h1`
  margin: 1.5rem 1.5rem 1.5rem 0;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.primary500};
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const Bar = styled.div<{ isWide: boolean }>`
  display: flex;
  justify-content: space-between;
  flex-direction: ${({ isWide }) => isWide ? 'row' : 'row-reverse'};
  flex-grow: 2;
  margin: 0 0.5rem;
`;

export const Header = () => {
  const user = useContext(UserContext);
  const isWide = useMedia('(min-width: 1000px)');
  return <Container>
    <Row style={{ alignItems: 'center' }}>
      <Col flexGrow={0}>
        <Title>Club Manager</Title>
      </Col>
      <Bar isWide={isWide}>
        {
          user && <Menu />
        }
        <UserInfo>
          {
            (user && user.photoURL) && <Avatar src={user.photoURL} />
          }
          {
            isWide && user && <Button outline size="sm" onClick={() => auth.signOut()}>logout</Button>
          }
        </UserInfo>
      </Bar>
    </Row>
  </Container>
};
