import React, {
  ChangeEvent,
  useEffect,
  useState,
} from 'react';
import DatePicker from 'react-date-picker';
import { connect } from 'react-redux';
import Select from 'react-select';
import { bindActionCreators } from 'redux';

import Button from '@bit/pollen8.fab-ui.button';
import Card from '@bit/pollen8.fab-ui.card';
import CardBody from '@bit/pollen8.fab-ui.card-body';
import FormGroup from '@bit/pollen8.fab-ui.form-group';
import Label from '@bit/pollen8.fab-ui.label';

import {
  Checkbox,
  Table,
} from '../../app/components/Table';
import * as clubActions from '../../Clubs/ClubActions';
import * as membersActions from '../../Members/MembersActions';
import { memberOptions } from '../../Members/selectors/memberOptions';
import { IGlobalState } from '../../reducers';
import * as teamActions from '../../Teams/TeamActions';
import * as matchActions from '../MatchActions';
import { IMatch } from '../Matches';
import GameScore, { ISet } from './GameScore';

const mapStateToProps = (state: IGlobalState) => ({
  attendance: state.attendance.data,
  clubNightManagers: state.attendance.clubNightManagers,
  memberOptions: memberOptions(state),
  teams: state.team.data,
  clubs: state.club.data,
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators({
    upsertMatch: matchActions.upsertMatch,
    getMembers: membersActions.getMembers,
    getClubs: clubActions.getClubs,
    getTeams: teamActions.getTeams,
  }, dispatch);

const set: ISet = { home: 0, visitors: 0 };
export const blankMatch: IMatch = {
  id: '',
  captain: '',
  createdBy: '',
  opponent: '',
  date: new Date().getTime(),
  players: [
    { paid: false, direct: false },
    { paid: false, direct: false },
    { paid: false, direct: false },
    { paid: false, direct: false },
    { paid: false, direct: false },
    { paid: false, direct: false },
  ],
  results: [
    {
      pair: [],
      result: {
        0: [set, set, set],
        1: [set, set, set],
        2: [set, set, set],
      }
    }
  ]
};

type Props = ReturnType<typeof mapStateToProps>
  & ReturnType<typeof mapDispatchToProps> & {
    initialData: IMatch,
  };

const TeamForm = ({
  upsertMatch,
  initialData,
  getMembers,
  memberOptions,
  getClubs,
  clubs,
  teams,
  getTeams,
}: Props) => {
  const [formData, setFormData] = useState<IMatch>(initialData);
  useEffect(() => {
    setFormData(initialData);
    getMembers();
    getTeams();
    getClubs();
  }, [initialData, getMembers, getTeams, getClubs]);
  const teamOptions = teams.map((t) => ({ value: t, label: t.name }));
  const clubTeamOptions = clubs.reduce<string[]>((prev, next) => {
    return prev.concat(next.teams);
  }, [])
    .map(((v) => ({ value: v, label: v })));

  const updateScore = (score: ISet[], row: number, col: 0 | 1 | 2) => {
    const results = formData.results ? [...formData.results] : [];
    if (!results[row / 2]) {
      results[row / 2] = {
        pair: [],
        result: {
          0: [],
          1: [],
          2: [],
        }
      }
    }
    results[row / 2].result[col] = score;
    const res = {
      ...formData,
      results,
    };
    setFormData(res);
    if (formData.id !== '') {
      upsertMatch(res);
    }
  };

  return (
    <Card>
      <CardBody>

        <FormGroup>
          <Label htmlFor="team">
            Team
            </Label>
          <Select
            id="team"
            defaultValue={teamOptions[0]}
            onChange={(v: any) => {
              setFormData({
                ...formData,
                team: v.value,
              })
            }}
            options={teamOptions} />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="opponent">
            Opponent
            </Label>
          <Select
            id="opponent"
            defaultValue={clubTeamOptions[0]}
            onChange={(v: any) => {
              setFormData({
                ...formData,
                opponent: v.value,
              })
            }}
            options={clubTeamOptions} />
        </FormGroup>

        <FormGroup>
          <Label>
            Match night
        </Label>
          <DatePicker
            clearIcon={null}
            value={new Date(formData.date)}
            onChange={(v: any) => {
              const d = Array.isArray(v) ? v[0] : v;
              const date = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
              setFormData({
                ...formData,
                date,
              });
            }}

            returnValue="start"
          />
        </FormGroup>
        <Table style={{ width: '100%' }}>
          <tr>
            <th>Pair</th>
            <th>Opponent 1</th>
            <th>Opponent 2</th>
            <th>Opponent 3</th>
          </tr>

          {
            formData.players.map((n, i) => {
              return (
                <tr>
                  <td>
                    <FormGroup>
                      <Select
                        value={n.player ? {
                          value: n.player,
                          label: n.player.name,
                        } : null}
                        onChange={(v: any) => {
                          const players = [...formData.players];
                          players[i] = { ...players[i], player: v.value };
                          setFormData({
                            ...formData,
                            players,
                          })
                        }}
                        options={memberOptions} />
                    </FormGroup>
                  </td>
                  {i % 2 === 0 &&
                    <>
                      <td rowSpan={2} style={{ padding: '1rem 0' }}>
                        <GameScore
                          value={formData.results[i / 2] ? formData.results[i / 2].result[0] : [set, set, set]}
                          onChange={(score) => {
                            updateScore(score, i, 0);
                          }} />
                      </td>
                      <td rowSpan={2} style={{ padding: '1rem 0' }}>
                        <GameScore
                          value={formData.results[i / 2] ? formData.results[i / 2].result[1] : [set, set, set]}
                          onChange={(score) => {
                            updateScore(score, i, 1);
                          }} />
                      </td>
                      <td rowSpan={2} style={{ padding: '1rem 0' }}>
                        <GameScore
                          value={formData.results[i / 2] ? formData.results[i / 2].result[2] : [set, set, set]}
                          onChange={(score) => {
                            updateScore(score, i, 2);
                          }} />
                      </td>
                    </>
                  }
                </tr>
              )
            })

          }
        </Table>
        <h3>Payment</h3>
        <Table style={{ width: '100%' }}>
          <tr>
            <th>Player</th>
            <th>Paid</th>
            <th>Direct to BHP</th>
          </tr>
          {
            formData.players.map((n, i) => {
              return (
                <tr>
                  <td>
                    <FormGroup>
                      <Select
                        value={n.player ? {
                          value: n.player,
                          label: n.player.name,
                        } : null}
                        onChange={(v: any) => {
                          const players = [...formData.players];
                          players[i] = { ...players[i], player: v.value };
                          setFormData({
                            ...formData,
                            players,
                          })
                        }}
                        options={memberOptions} />
                    </FormGroup>
                  </td>
                  <td>
                    <Checkbox type="checkbox"
                      checked={n.paid}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        const players = [...formData.players];
                        players[i] = { ...players[i], paid: e.target.checked };
                        setFormData({
                          ...formData,
                          players,
                        })
                      }}
                    />
                  </td>
                  <td>
                    <Checkbox type="checkbox"
                      checked={n.direct}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        const players = [...formData.players];
                        players[i] = { ...players[i], direct: e.target.checked };
                        setFormData({
                          ...formData,
                          players,
                        })
                      }}
                    />
                  </td>
                </tr>
              )
            })

          }
        </Table>
        <div style={{ marginTop: '0.75rem', marginBottom: '3rem' }}>
          <Button type="button"
            style={{ float: 'right' }}
            onClick={() => {
              upsertMatch(formData)
              setFormData(blankMatch);
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
              onClick={() => setFormData(blankMatch)}
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

