import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Input,
  Label,
} from 'fab-ui';
import React, {
  FC,
  useEffect,
  useState,
} from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { bindActionCreators } from 'redux';

import * as membersActions from '../../Members/MembersActions';
import { memberOptions } from '../../Members/selectors/memberOptions';
import { IGlobalState } from '../../reducers';
import * as teamActions from '../TeamActions';
import { ITeam } from '../Teams';

const mapStateToProps = (state: IGlobalState) => ({
  attendance: state.attendance.data,
  clubNightManagers: state.attendance.clubNightManagers,
  memberOptions: memberOptions(state),
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators({
    upsertTeam: teamActions.upsertTeam,
    getMembers: membersActions.getMembers,
  }, dispatch);

export const blankTeam: ITeam = {
  id: '',
  createdBy: '',
  name: '',
  captain: '',
};

type Props = ReturnType<typeof mapStateToProps>
  & ReturnType<typeof mapDispatchToProps> & {
    initialData: ITeam,
  };

const TeamForm: FC<Props> = ({
  upsertTeam,
  initialData,
  getMembers,
  memberOptions,
}) => {
  const [formData, setFormData] = useState<ITeam>(initialData);
  useEffect(() => {
    setFormData(initialData);
    getMembers();
  }, [initialData, getMembers])
  return (
    <Card>
      <CardBody>
        <FormGroup>
          <Label htmlFor="name">
            Name
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
            }} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="captain">
            Captain
          </Label>
          <Select
            id="captain"
            options={memberOptions}
            value={memberOptions.filter((o) => o.value.id === formData.captain)}
            onChange={(v: any) => {
              if (!v) {
                return;
              }
              setFormData({ ...formData, captain: v.value.id });
            }} />
        </FormGroup>
        <div style={{ marginTop: '0.75rem', marginBottom: '3rem' }}>
          <Button type="button"
            style={{ float: 'right' }}
            onClick={() => {
              upsertTeam(formData)
              setFormData(blankTeam);
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
              onClick={() => setFormData(blankTeam)}
            >Clear</Button>
          }
        </div>
      </CardBody>
    </Card>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TeamForm);

