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
import * as clubActions from './ClubActions';
import ClubForm, { blankClub } from './components/ClubForm';

export interface IClub {
  id: string;
  createdBy: string;
  name: string;
  teams: string[];
}

const mapStateToProps = (state: IGlobalState) => ({
  clubs: state.club.data,
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators({
    deleteClub: clubActions.deleteClub,
    getClubs: clubActions.getClubs,
  }, dispatch);

type Props = ReturnType<typeof mapDispatchToProps>
  & ReturnType<typeof mapStateToProps>;

const Teams = ({
  getClubs,
  clubs,
  deleteClub,
}: Props) => {

  useEffect(() => {
    (async () => {
      await getClubs();
    })();
  }, [getClubs]);

  const user = useContext(UserContext);

  const [selectedClub, setFormData] = useState<IClub>({
    ...blankClub,
    createdBy: user !== null ? String(user.email) : '',
  });


  return (
    <PageContainer>
      <Row>
        <Col>
          <ClubForm initialData={selectedClub} />
        </Col>
        <Col>
          <Card>
            <CardBody>
              {
                clubs.length === 0 ?
                  <Alert color="info">
                    Please add a club
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
                        clubs.map((line, i) => {
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
                                  deleteClub(line.id);
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
