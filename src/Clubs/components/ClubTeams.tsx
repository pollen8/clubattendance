
import React, {
  ChangeEvent,
  useState,
} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Alert from '@bit/pollen8.fab-ui.alert';
import Button from '@bit/pollen8.fab-ui.button';
import Card from '@bit/pollen8.fab-ui.card';
import CardBody from '@bit/pollen8.fab-ui.card-body';
import FormGroup from '@bit/pollen8.fab-ui.form-group';
import Input from '@bit/pollen8.fab-ui.input';
import Label from '@bit/pollen8.fab-ui.label';

import { DeleteConfirmation } from '../../app/components/DeleteModal';
import { Table } from '../../app/components/Table';
import { IGlobalState } from '../../reducers';
import * as clubActions from '../ClubActions';
import { IClub } from '../Clubs';

const mapStateToProps = (state: IGlobalState) => ({
  clubs: state.club,
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators({
    deleteClubTeam: clubActions.deleteClubTeam,
    addClubTeam: clubActions.addClubTeam,
  }, dispatch);

type Props = {
  club: IClub;
} & ReturnType<typeof mapDispatchToProps>;

const ClubTeams = ({
  club,
  deleteClubTeam,
  addClubTeam,
}: Props) => {
  const teams = club.teams || [];
  const [formData, setFormData] = useState<string>('');
  if (club.id === '') {
    return null;
  }
  return (
    <Card>
      <CardBody>
        {
          teams.length === 0 ?
            <Alert color="info">
              Please add a club team
                </Alert>
            :
            <Table style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  teams.map((line, i) => {
                    return <tr key={line}

                      onClick={() => setFormData(line)}
                    >
                      <td>
                        {line}
                      </td>
                      <td>
                        <DeleteConfirmation
                          onDelete={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            deleteClubTeam(club, line);
                          }} />
                      </td>
                    </tr>;
                  })
                }
              </tbody>
            </Table>
        }
        {
          club.id !== '' &&
          <>
            <FormGroup>
              <Label>Team name</Label>
              <Input type="text"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData(e.target.value)}
                value={formData}
              />
            </FormGroup>
            <Button size="sm"
              onClick={() => {
                addClubTeam(club, formData);
                setFormData('');
              }}
            >
              Add
        </Button>
          </>
        }
      </CardBody>
    </Card>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClubTeams);
