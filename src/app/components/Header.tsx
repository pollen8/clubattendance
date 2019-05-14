import {
  Col,
  Container,
  Row,
} from 'fab-ui';
import React, { FC } from 'react';
import styled from 'styled-components';

import { Menu } from './Menu';

const Title = styled.h1`
  margin: 1.5rem 1.5rem 1.5rem 0;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.primary500};
`;

export const Header: FC<{}> = () => {
  return <Container>
    <Row style={{ alignItems: 'center' }}>
      <Col flexGrow={0}>
        <Title>Club Manager</Title>
      </Col>
      <Col flexGrow={2}>
        <Menu />
      </Col>
    </Row>
  </Container>
};
