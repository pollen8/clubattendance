import {
  Card,
  CardBody,
  Col,
  Row,
} from 'fab-ui';
import React, {
  FC,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  MdClose,
  MdDone,
} from 'react-icons/md';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled, { withTheme } from 'styled-components';

import { UserContext } from '../App';
import { PageContainer } from '../app/components/PageContainer';
import {
  Checkbox,
  Table,
} from '../app/components/Table';
import { IMember } from '../Members/Members';
import * as membersActions from '../Members/MembersActions';
import { IGlobalState } from '../reducers';
import { theme } from '../theme';
import * as attendanceActions from './AttendanceActions';
import AttendanceForm from './components/AttendanceForm';

const mapStateToProps = (state: IGlobalState) => ({
  attendance: state.attendance.data,
  members: state.member.data,
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators({
    getAttendance: attendanceActions.getAttendance,
    getClubNightManagers: attendanceActions.getClubNightManagers,
    getMembers: membersActions.getMembers,
    upsertAttendance: attendanceActions.upsertAttendance,
  }, dispatch);

const Tr = styled.tr<{ attended: boolean, guestNotPaid: boolean }>`
  color: ${({ attended, theme }) => attended ? theme.grey800 : theme.grey500} !important;
  background: ${({ guestNotPaid, theme }) => guestNotPaid ? theme.danger100 : 'transparent'};
`;

export interface IClubNight {
  createdAt?: Date;
  id: string;
}
export interface IAttendance {
  createdBy?: string;
  attended: boolean;
  createdAt?: Date;
  id?: string;
  clubNight: number;
  member: string;
  paid: boolean;
  updatedAt?: Date;
}

const blankForm: IAttendance = {
  id: '',
  attended: true,
  clubNight: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime(),
  member: '',
  paid: false,
};

interface IProps {
  theme: Partial<typeof theme>;
}

type Props = IProps & ReturnType<typeof mapStateToProps>
  & ReturnType<typeof mapDispatchToProps>;

const Attendance: FC<Props> = ({
  theme,
  attendance,
  getAttendance,
  members,
  getMembers,
  getClubNightManagers,
  upsertAttendance,
}) => {
  const [formData, setFormData] = useState<IAttendance>(blankForm);

  let attendedTotal = 0;
  let guestFeeTotal = 0;

  const user = useContext(UserContext);
  useEffect(() => {
    (async () => {
      await getAttendance();
      await getMembers();
      await getClubNightManagers();
    })();
  }, []);
  return (
    <PageContainer>
      <Row>
        <Col xs={12} md={12}>
          <Card>
            <CardBody>
              <AttendanceForm
                formData={formData}
                setFormData={setFormData}
              />
              <Table style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th>Member</th>
                    <th>Type</th>
                    <th>Attended</th>
                    <th>Paid</th>
                    <th>-</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    members
                      .map((member: IMember, i: number) => {
                        // do we have an attendance for the date/member?
                        const record = attendance.find((row: IAttendance) => {
                          return row.member === member.id
                            && row.clubNight === formData.clubNight;
                        });
                        if (record && record.attended) {
                          attendedTotal++;
                        }
                        if (member.membership === 'guest' && record && record.paid) {
                          guestFeeTotal = guestFeeTotal + 7;
                        }
                        return <Tr key={member.id}
                          attended={Boolean(record && record.attended)}
                          guestNotPaid={Boolean(member.membership === 'guest' && record && record.attended && !record.paid)}>
                          <td>
                            <label htmlFor={`attended-${i}`}>
                              {member.name}
                            </label>
                          </td>
                          <td>
                            {member.membership}
                          </td>
                          <td>
                            <Checkbox type="checkbox"
                              checked={record && record.attended}
                              onChange={(e) => {
                                const attendance: IAttendance = {
                                  ...formData,
                                  attended: e.target.checked,
                                  createdBy: user !== null ? String(user.email) : '',
                                  id: record ? record.id : '',
                                  member: member.id,
                                };
                                upsertAttendance(attendance);
                              }} />
                          </td>
                          <td>
                            {
                              member.membership === 'guest' && <Checkbox
                                type="checkbox"
                                checked={record && record.paid}
                                onChange={(e) => {
                                  const attendance: IAttendance = {
                                    ...formData,
                                    member: member.id,
                                    id: record ? record.id : '',
                                    paid: e.target.checked,
                                  };
                                  upsertAttendance(attendance);
                                }} />
                            }
                            {
                              member.membership === 'member' &&
                              member.paid && <MdDone color={theme.success500} />
                            }
                            {
                              member.membership === 'member' &&
                              !member.paid &&
                              <MdClose color={theme.danger500} />
                            }
                          </td>
                        </Tr>;
                      })
                  }
                </tbody>
                <tfoot>
                  <tr>
                    <td></td>
                    <td></td>
                    <td>
                      {attendedTotal}
                    </td>
                    <td>
                      &pound;{guestFeeTotal}
                    </td>
                  </tr>
                </tfoot>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(Attendance));
