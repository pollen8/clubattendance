import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { bindActionCreators } from 'redux';

import Button from '@bit/pollen8.fab-ui.button';
import Col from '@bit/pollen8.fab-ui.col';
import FormGroup from '@bit/pollen8.fab-ui.form-group';
import Input from '@bit/pollen8.fab-ui.input';
import Label from '@bit/pollen8.fab-ui.label';
import Row from '@bit/pollen8.fab-ui.row';

import { Checkbox } from '../../app/components/Table';
import { IGlobalState } from '../../reducers';
import {
  blankMember,
  IMember,
} from '../Members';
import * as membersActions from '../MembersActions';

const mapStateToProps = (state: IGlobalState) => ({
  members: state.member.data,
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators({
    deleteMember: membersActions.deleteMember,
    getMembers: membersActions.getMembers,
    upsertMember: membersActions.upsertMember,
  }, dispatch);
;

interface IProps {
  formData: IMember;
  setFormData: (formdata: IMember) => void;
}

type Props = IProps & ReturnType<typeof mapDispatchToProps>;

const MemberForm = ({
  formData,
  setFormData,
  upsertMember,
}: Props) => {
  return (
    <>
      <Row>
        <Col>
          <Label htmlFor="name">
            Name
        </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setFormData({ ...formData, name: e.target.value });
            }} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Label htmlFor="tel">Tel
        </Label>
          <Input
            id="tel"
            value={formData.tel}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setFormData({ ...formData, tel: e.target.value });
            }} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Label htmlFor="email">Email
        </Label>
          <Input
            id="email"
            value={formData.email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setFormData({ ...formData, email: e.target.value });
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
        <Col>
          <Label>Gender</Label>
          <Label>
            <Checkbox type="radio"
              checked={formData.gender === 'male'}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({
                ...formData,
                gender: 'male'
              })} />{' '}
            Male
              </Label>

          <Label>
            <Checkbox type="radio"
              checked={formData.gender === 'female'}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({
                ...formData,
                gender: 'female'
              })} />
            Female
              </Label>
          <Label>
            <Checkbox type="radio"
              checked={formData.gender === 'other'}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({
                ...formData,
                gender: 'other'
              })} />
            Other
              </Label>


        </Col>
      </Row>
      <Row>
        <Col>
          {
            formData.membership === 'member' &&
            <FormGroup>
              <Label htmlFor="paid">
                Paid
            </Label>
              <Checkbox type="checkbox"
                id="paid"
                checked={formData.paid}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({
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
                upsertMember(formData)
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
    </>
  )
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MemberForm)
