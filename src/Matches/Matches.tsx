
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
import { IMember } from '../Members/Members';
import { IGlobalState } from '../reducers';
import { ITeam } from '../Teams/Teams';
import { ISet } from './components/GameScore';
import TeamForm, { blankMatch } from './components/MatchForm';
import * as matchActions from './MatchActions';

interface IResult {
  pair: IMember[];
  result: {
    0: ISet[];
    1: ISet[];
    2: ISet[];
  }
}

export interface IMatch {
  id: string;
  captain: string;
  createdBy: string;
  date: number,
  opponent?: string;
  team?: ITeam;
  players: Array<{
    player?: IMember;
    paid: boolean;
    direct: boolean;
  }>,
  results: IResult[];
};

const mapStateToProps = (state: IGlobalState) => ({
  matches: state.match.data,
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators({
    deleteMatch: matchActions.deleteMatch,
    getMatches: matchActions.getMatches,
  }, dispatch);

type Props = ReturnType<typeof mapDispatchToProps>
  & ReturnType<typeof mapStateToProps>;

const Matches = ({ 
  getMatches,
  matches, 
  deleteMatch,
}: Props) => {

  useEffect(() => {
    (async () => {
      await getMatches();
    })();
  }, [getMatches]);

  const user = useContext(UserContext);

  const [selectedTeam, setFormData] = useState<IMatch>({
    ...blankMatch,
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
                matches.length === 0 ?
                  <Alert color="info">
                    Please add a match
                </Alert>
                  :
                  <Table style={{ width: '100%' }}>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Team</th>
                        <th>Opponent</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        matches.map((line, i) => {
                          return <tr key={line.id}

                            onClick={() => setFormData(line)}>
                            <td>
                              {new Date(line.date).toLocaleDateString()}
                            </td>
                            <td>
                              {line.team && line.team.name}
                            </td>
                            <td>
                              {line.opponent && line.opponent}
                            </td>
                            <td>
                              <DeleteConfirmation
                                onDelete={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  deleteMatch(line.id);
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
)(Matches);
