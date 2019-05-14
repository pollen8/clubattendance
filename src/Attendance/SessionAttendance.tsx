import {
  Card,
  CardBody,
} from 'fab-ui';
import React, { FC } from 'react';
import { Spring } from 'react-spring/renderprops';
import styled from 'styled-components';

import { IAttendance } from './Attendance';

interface IProps {
  attendance: IAttendance[];
}

const StatsCard = styled(Card)`
  color: ${({ theme }) => theme.primary500};
`;

export const SessionAttendance: FC<IProps> = ({ attendance }) => {
  return null;
  // const total = attendance.length;
  // const attending = attendance.filter((l) => l.attended).length;
  // const percent = total === 0 ? 0 : (attending / total);
  // return (
  //   <StatsCard>
  //     <CardBody>
  //       <Spring
  //         config={{ tension: 210, friction: 14, clamp: true }}
  //         from={{ number: 0 }}
  //         to={{ number: percent }}
  //       >
  //         {(style) => <h3>{(style.number * 100).toFixed(2)}%</h3>
  //         }
  //       </Spring>

  //       <div>Attendance</div>
  //     </CardBody>
  //   </StatsCard>
  // )
}