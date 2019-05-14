import {
  Card,
  CardBody,
  Col,
  Label,
  Row,
} from 'fab-ui';
import React, {
  FC,
  useState,
} from 'react';
import DatePicker from 'react-date-picker';
import {
  MdClose,
  MdDone,
} from 'react-icons/md';
import Select from 'react-select';
import { withTheme } from 'styled-components';

import { PageContainer } from '../app/components/PageContainer';
import { Checkbox, Table } from '../app/components/Table';
import {
  useStateValue,
} from '../firebase';
import { blankMember } from '../Members/Members';
import { theme } from '../theme';

// import { SessionAttendance } from './SessionAttendance';
// import { SessionPayments } from './SessionPayments';

export interface IClubNight {
  createdAt?: Date;
  id: string;
}
export interface IAttendance {
  attended: boolean;
  createdAt?: Date;
  id?: string;
  clubNight: number;
  member: string;
  paid: boolean;
  updatedAt?: Date;
}

const blankForm: IAttendance = {
  attended: true,
  clubNight: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime(),
  member: '',
  paid: false,
};

interface IProps {
  theme: Partial<typeof theme>;
}


const Attendance: FC<IProps> = ({ theme }) => {
  const [formData, setFormData] = useState<IAttendance>(blankForm);
  const { state, dispatch } = useStateValue();
  const { attendance, members, clubNightManagers } = state;
  const memberOptions = members.map((member) => ({ value: member, label: member.name }));
  const m = clubNightManagers.find((manager) => manager.clubNight === formData.clubNight);
  const manager = m === undefined
    ? { value: blankMember, label: '' }
    : { value: m.member, label: m.member.name }
  return (
    <PageContainer>
      <Row>
        <Col xs={12} md={12}>
          <Card>
            <CardBody>
              <Row>
                <Col>
                  <Label>Club night</Label>
                  <DatePicker
                    clearIcon={null}
                    value={new Date(formData.clubNight)}
                    onChange={(v) => {
                      const date = Array.isArray(v) ? v[0] : v;
                      const clubNight = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

                      setFormData({
                        ...formData,
                        clubNight,
                      });
                    }}

                    returnValue="start"
                  />
                </Col>
                <Col>
                  <Label>Manager</Label>
                  <Select
                    options={memberOptions}
                    value={manager}
                    onChange={(v: any) => {
                      if (!v) {
                        return;
                      }
                      dispatch({
                        type: 'UPSERT_CLUBNIGHT_MANAGER', manager: {
                          clubNight: formData.clubNight,
                          member: v.value,
                        }
                      })
                    }} />
                </Col>
              </Row>
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
                    state.members
                      .map((member, i) => {
                        // do we have an attendance for the date/member?
                        const record = attendance.find((row) => {
                          return row.member === member.id
                            && row.clubNight === formData.clubNight;
                        });
                        return <tr key={member.id}>
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
                              defaultChecked={record && record.attended}
                              onChange={(e) => {
                                const attendance: IAttendance = {
                                  ...formData,
                                  attended: e.target.checked,
                                  member: member.id,
                                };
                                dispatch({ type: 'UPSERT_ATTENDANCE', attendance })
                              }} />
                          </td>
                          <td>
                            {
                              member.membership === 'guest' && <Checkbox
                                type="checkbox"
                                defaultChecked={record && record.paid}
                                onChange={(e) => {
                                  const attendance: IAttendance = {
                                    ...formData,
                                    member: member.id,
                                    paid: e.target.checked,
                                  };
                                  dispatch({ type: 'UPSERT_ATTENDANCE', attendance })
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
                        </tr>;
                      })
                  }
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default withTheme(Attendance);