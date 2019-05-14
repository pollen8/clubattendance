import {
  Alert,
  Button,
  Card,
  CardBody,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
} from 'fab-ui';
import React, { useState } from 'react';
import {
  MdClose,
  MdDone,
} from 'react-icons/md';
import Select from 'react-select';
import { withTheme } from 'styled-components';

import { PageContainer } from '../app/components/PageContainer';
import {
  Checkbox,
  Table,
} from '../app/components/Table';
import {
  useStateValue,
} from '../firebase';
import { theme } from '../theme';

export type IMembershipType = '' | 'member' | 'guest';
export interface IMember {
  createdAt?: Date;
  id: string;
  name: string;
  membership: IMembershipType;
  paid: boolean;
  updatedAt?: Date;
  season?: any;
}

export const blankMember: IMember = {
  id: '',
  name: '',
  paid: false,
  membership: 'guest',
}


interface IProps {
  theme: Partial<typeof theme>;
}

const Members = ({ theme }: IProps) => {
  const [formData, setFormData] = useState(blankMember);
  const { state, dispatch } = useStateValue();
  const { members } = state;

  return (
    <PageContainer>
      <Row>
        <Col xs={12} md={4}>
          <Card>
            <CardBody>
              <Row>
                <Col>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                    }} />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Label htmlFor="membership">Membership</Label>
                  <Select
                    id="membership"
                    defaultValue={{ value: 'guest', label: 'guest' }}
                    value={{ value: formData.membership, label: formData.membership }}
                    onChange={(v: any) => {
                      setFormData({
                        ...formData,
                        membership: v.value,
                      })
                    }}
                    options={[
                      { value: 'guest', label: 'guest' },
                      { value: 'member', label: 'member' },
                    ]} />

                </Col>
              </Row>
              <Row>
                <Col>
                  {
                    formData.membership === 'member' &&
                    <FormGroup>
                      <Label>Paid</Label>
                      <Checkbox type="checkbox"
                        checked={formData.paid}
                        onChange={(e) => setFormData({
                          ...formData,
                          paid: e.target.checked,
                        })}
                      />
                    </FormGroup>

                  }
                </Col>
                <Col>
                  <div style={{ marginTop: '0.75rem' }}>
                    <Button type="button"
                      style={{ float: 'right' }}
                      onClick={() => {
                        dispatch({ type: 'UPSERT_MEMBER', member: formData });
                        setFormData(blankMember);
                      }}>
                      {
                        formData.id === '' ? 'Add' : 'Update'
                      }
                    </Button>
                    {
                      formData.id !== '' &&
                      <Button type="button"
                        style={{ float: 'right' }}
                        outline
                        onClick={() => setFormData(blankMember)}
                      >Clear</Button>
                    }
                  </div>
                </Col>
              </Row>
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
                        members.map((line, i) => {
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
                              <Button color="danger"
                                size="sm"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  dispatch({ type: 'REMOVE_MEMBER', id: line.id });
                                }}>
                                Delete
                          </Button>
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

export default withTheme(Members);
