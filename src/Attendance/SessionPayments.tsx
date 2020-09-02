import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Spring } from 'react-spring/renderprops';
import styled from 'styled-components';

import Card from '@bit/pollen8.fab-ui.card';
import CardBody from '@bit/pollen8.fab-ui.card-body';

import { IGlobalState } from '../reducers';

interface IProps {
  clubNight: number;
}

const mapStateToProps = (state: IGlobalState) => ({
  attendance: state.attendance.data,
  members: state.member.data,
});


type Props = IProps & ReturnType<typeof mapStateToProps>;

const StatsCard = styled(Card)`
  color: ${({ theme }) => theme.primary500};
`;

export const SessionPayments: FC<Props> = ({ attendance, members }) => {
  const ok = attendance.map((row) => {
    const member = members.find((member) => member.id === row.member);
    return {
      ...row,
      member: member || { membership: '' },
    };
  });
  const total = ok.filter((l) => l.attended && l.member.membership === 'guest').length;
  const paid = ok.filter((l) => l.paid && l.member.membership === 'guest').length;
  const percent = total === 0 ? 1 : (paid / total);
  return (
    <StatsCard>
      <CardBody>
        <Spring
          config={{ tension: 210, friction: 14, clamp: true }}
          from={{ number: 0 }}
          to={{ number: percent }}
        >
          {(style) => <h3>{(style.number * 100).toFixed(2)}%</h3>
          }
        </Spring>

        <div>Guests Paid</div>
        total : {total}
      </CardBody>
    </StatsCard>
  )
}

export default connect(
  mapStateToProps,
)(SessionPayments);
