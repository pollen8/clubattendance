
import React, {
  ChangeEvent,
  useEffect,
  useState,
} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from '@bit/pollen8.fab-ui.button';
import Card from '@bit/pollen8.fab-ui.card';
import CardBody from '@bit/pollen8.fab-ui.card-body';
import FormGroup from '@bit/pollen8.fab-ui.form-group';
import Input from '@bit/pollen8.fab-ui.input';
import Label from '@bit/pollen8.fab-ui.label';

import * as actions from '../ClubActions';
import { IClub } from '../Clubs';
import ClubTeams from './ClubTeams';

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators({
    upsertTeam: actions.upsertClub,
  }, dispatch);

export const blankClub: IClub = {
  id: '',
  createdBy: '',
  name: '',
  teams: [],
};

type Props = ReturnType<typeof mapDispatchToProps> & {
  initialData: IClub,
};

const ClubForm = ({
  upsertTeam,
  initialData,
}: Props) => {
  const [formData, setFormData] = useState<IClub>(initialData);
  useEffect(() => {
    setFormData(initialData);
  }, [initialData])
  return (
    <>
      <Card>
        <CardBody>
          <FormGroup>
            <Label htmlFor="name">
              Name
          </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setFormData({ ...formData, name: e.target.value });
              }} />
          </FormGroup>

          <div style={{ marginTop: '0.75rem', marginBottom: '3rem' }}>
            <Button type="button"
              style={{ float: 'right' }}
              onClick={() => {
                upsertTeam(formData)
                setFormData(blankClub);
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
                onClick={() => setFormData(blankClub)}
              >Clear</Button>
            }
          </div>
        </CardBody>
      </Card>
      <ClubTeams club={initialData} />
    </>
  )
}

export default connect(
  null,
  mapDispatchToProps,
)(ClubForm);

