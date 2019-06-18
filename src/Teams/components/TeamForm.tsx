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

import * as teamActions from '../TeamActions';
import { ITeam } from '../Teams';

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators({
    upsertTeam: teamActions.upsertTeam,
  }, dispatch);

export const blankTeam: ITeam = {
  id: '',
  createdBy: '',
  name: '',
};

type Props = ReturnType<typeof mapDispatchToProps> & {
  initialData: ITeam,
};

const TeamForm: FC<Props> = ({ upsertTeam, initialData }) => {
  const [formData, setFormData] = useState<ITeam>(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData])
  return (
    <Card>
      <CardBody>
        <FormGroup>
          <Label>
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
  null,
  mapDispatchToProps,
)(TeamForm);

