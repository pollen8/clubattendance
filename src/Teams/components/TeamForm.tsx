import {
  Button,
  Card,
  CardBody,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
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
  places: 0,
  placesFemale: 0,
  placesMale: 0,
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
        <fieldset>
          <legend>Players</legend>
          <FormGroup>
            <Label>Number players</Label>
            <Input type="number"
              value={formData.places}
              onChange={(e) => setFormData({ ...formData, places: Number(e.target.value) })}
            />
          </FormGroup>
          <Row noGutters>
            <Col>
              <FormGroup>
                <Label>Of which must be female players</Label>
                <Input type="number"
                  value={formData.placesFemale}
                  onChange={(e) => setFormData({ ...formData, placesFemale: Number(e.target.value) })}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Of which must be male players</Label>
                <Input type="number"
                  value={formData.placesMale}
                  onChange={(e) => setFormData({ ...formData, placesMale: Number(e.target.value) })}
                />
              </FormGroup>
            </Col>
          </Row>
        </fieldset>
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
    </Card >
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TeamForm);

