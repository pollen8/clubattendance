import {
  Button,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
} from 'fab-ui';
import React, { FC } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { bindActionCreators } from 'redux';

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

const MemberForm: FC<Props> = ({
  formData,
  setFormData,
  upsertMember,
}) => {
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
        <Col>
          <Label>Gender</Label>
          <Label>
            <Checkbox type="radio"
              checked={formData.gender === 'male'}
              onChange={(e) => setFormData({
                ...formData,
                gender: 'male'
              })} />{' '}
            Male
              </Label>

          <Label>
            <Checkbox type="radio"
              checked={formData.gender === 'female'}
              onChange={(e) => setFormData({
                ...formData,
                gender: 'female'
              })} />
            Female
              </Label>
          <Label>
            <Checkbox type="radio"
              checked={formData.gender === 'other'}
              onChange={(e) => setFormData({
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