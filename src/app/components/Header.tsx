import {
  Button,
  Col,
  Container,
  Row,
} from 'fab-ui';
import React, {
  FC,
  useContext,
} from 'react';
import styled from 'styled-components';

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

const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  flex-grow: 2;
  margin: 0 0.5rem;
`;

export const Header: FC<{}> = () => {
  const user = useContext(UserContext);
  return <Container>
    <Row style={{ alignItems: 'center' }}>
      <Col flexGrow={0}>
        <Title>Club Manager</Title>
      </Col>
      <Bar>
        {
          user && <Menu />
        }
        <UserInfo>
          {
            (user && user.photoURL) && <Avatar src={user.photoURL} />
          }
          {
            user && <Button outline size="sm" onClick={() => auth.signOut()}>logout</Button>
          }
        </UserInfo>
      </Bar>
    </Row>
  </Container>
};
