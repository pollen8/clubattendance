import {
  Alert,
  Card,
  CardBody,
  Col,
  Row,
} from 'fab-ui';
import React, {
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
import { withTheme } from 'styled-components';

import { UserContext } from '../App';
import { DeleteConfirmation } from '../app/components/DeleteModal';
import { PageContainer } from '../app/components/PageContainer';
import { Table } from '../app/components/Table';
import { IGlobalState } from '../reducers';
import { theme } from '../theme';
import MemberForm from './components/MemberForm';
import * as membersActions from './MembersActions';

export type IMembershipType = '' | 'member' | 'guest';
export interface IMember {
  createdAt?: Date;
  createdBy: string;
  id: string;
  name: string;
  membership: IMembershipType;
  paid: boolean;
  updatedAt?: Date;
  season?: any;
  gender?: 'male' | 'female' | 'other';
}

export const blankMember: IMember = {
  createdBy: '',
  id: '',
  name: '',
  paid: false,
  membership: 'guest',
}


interface IProps {
  theme: Partial<typeof theme>;
}

type Props = IProps & ReturnType<typeof mapStateToProps>
  & ReturnType<typeof mapDispatchToProps>;

const Members = ({ theme, getMembers, members, upsertMember, deleteMember }: Props) => {
  const user = useContext(UserContext);
  const [formData, setFormData] = useState<IMember>({
    ...blankMember,
    createdBy: user !== null ? String(user.email) : '',
  });

  useEffect(() => {
    (async () => {
      await getMembers();
    })();
  }, [getMembers]);

  return (
    <PageContainer>
      <Row>
        <Col xs={12} md={4}>
          <Card>
            <CardBody>
              <MemberForm
                formData={formData}
                setFormData={setFormData}
              />
            </CardBody>
          </Card>
        </Col>
        <Col xs={12} md={8}>
          <Card>
            <CardBody>
              {
                members.length === 0 ?
                  <Alert color="info">
                    Please add a member
                </Alert>
                  :
                  <Table style={{ width: '100%' }}>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Membership</th>
                        <th>Paid</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        members.map((line: IMember, i: number) => {
                          return <tr key={line.id}

                            onClick={() => setFormData(line)}>
                            <td>
                              {line.name}
                            </td>
                            <td>
                              {line.membership}
                            </td>
                            <td>
                              {line.membership === 'guest'
                                ? '-'
                                : line.paid ? <MdDone color={theme.success500} /> : <MdClose color={theme.danger500} />}
                            </td>
                            <td>
                              <DeleteConfirmation
                                onDelete={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  deleteMember(line.id);
                                }} />
                            </td>
                          </tr>;
                        })
                      }
                    </tbody>
                  </Table>
              }
            </CardBody>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
}

const mapStateToProps = (state: IGlobalState) => ({
  members: state.member.data,
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators({
    deleteMember: membersActions.deleteMember,
    getMembers: membersActions.getMembers,
    upsertMember: membersActions.upsertMember,
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(Members));
