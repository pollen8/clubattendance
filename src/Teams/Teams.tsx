import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Alert from '@bit/pollen8.fab-ui.alert';
import Card from '@bit/pollen8.fab-ui.card';
import CardBody from '@bit/pollen8.fab-ui.card-body';
import Col from '@bit/pollen8.fab-ui.col';
import Row from '@bit/pollen8.fab-ui.row';

import { UserContext } from '../App';
import { DeleteConfirmation } from '../app/components/DeleteModal';
import { PageContainer } from '../app/components/PageContainer';
import { Table } from '../app/components/Table';
import { IGlobalState } from '../reducers';
import TeamForm, { blankTeam } from './components/TeamForm';
import * as teamActions from './TeamActions';

export interface ITeam {
  id: string;
  createdBy: string;
  name: string;
  captain: string;
  places: number;
  placesMale: number;
  placesFemale: number;
}

const mapStateToProps = (state: IGlobalState) => ({
  teams: state.team.data,
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators({
    deleteTeam: teamActions.deleteTeam,
    getTeams: teamActions.getTeams,
  }, dispatch);

type Props = ReturnType<typeof mapDispatchToProps>
  & ReturnType<typeof mapStateToProps>;

const Teams = ({ 
  getTeams, 
  teams, 
  deleteTeam,
}: Props) => {

  useEffect(() => {
    (async () => {
      await getTeams();
    })();
  }, [getTeams]);

  const user = useContext(UserContext);

  const [selectedTeam, setFormData] = useState<ITeam>({
    ...blankTeam,
    createdBy: user !== null ? String(user.email) : '',
  });


  return (
    <PageContainer>
      <Row>
        <Col>
          <TeamForm initialData={selectedTeam} />
        </Col>
        <Col>
          <Card>
            <CardBody>
              {
                teams.length === 0 ?
                  <Alert color="info">
                    Please add a team
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
                          return <tr key={line.id}

                            onClick={() => setFormData(line)}>
                            <td>
                              {line.name}
                            </td>
                            <td>
                              <DeleteConfirmation
                                onDelete={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  deleteTeam(line.id);
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
};


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Teams);
