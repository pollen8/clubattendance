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
import { bindActionCreators } from 'redux';

import * as actions from '../ClubActions';
import { IClub } from '../Clubs';

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators({
    upsertTeam: actions.upsertClub,
  }, dispatch);

export const blankClub: IClub = {
  id: '',
  createdBy: '',
  name: '',
};

type Props = ReturnType<typeof mapDispatchToProps> & {
  initialData: IClub,
};

const ClubForm: FC<Props> = ({
  upsertTeam,
  initialData,
}) => {
  const [formData, setFormData] = useState<IClub>(initialData);
  useEffect(() => {
    setFormData(initialData);
  }, [initialData])
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
  )
}

export default connect(
  null,
  mapDispatchToProps,
)(ClubForm);

