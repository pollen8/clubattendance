import {
  Alert,
  Card,
  CardBody,
  Col,
  Row,
} from 'fab-ui';
import React, {
  FC,
  useContext,
  useEffect,
  useState,
} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { UserContext } from '../App';
import { DeleteConfirmation } from '../app/components/DeleteModal';
import { PageContainer } from '../app/components/PageContainer';
import { Table } from '../app/components/Table';
import { IGlobalState } from '../reducers';
import ClubForm, { blankClub } from './components/ClubForm';
import * as clubActions from './ClubActions';

export interface IClub {
  id: string;
  createdBy: string;
  name: string;
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

const Teams: FC<Props> = ({ getClubs, clubs, deleteClub }) => {

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
