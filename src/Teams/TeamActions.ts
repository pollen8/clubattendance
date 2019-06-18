import {
  Action,
  ThunkResult,
} from '../app/Actions';
import { db } from '../fire';
import { IGlobalState } from '../reducers';
import { ITeam } from './Teams';

/**
 * Get teams
 */
const getTeams = (): ThunkResult<Action, IGlobalState, void> => {
  return async (dispatch) => {
    try {
      const snapshot = await db.collection('teams').get();
      const data: ITeam[] = [];
      snapshot.forEach((doc) => {
        const member: any = {
          ...doc.data(),
          id: String(doc.id),
        }
        data.push(member);
      });
      dispatch({ type: 'SET_TEAMS', data });
    } catch (err) {
      console.error(err);
    }
  };
};

const upsertTeam = (team: ITeam): ThunkResult<Action, IGlobalState, void> => {
  return async (dispatch) => {
    try {
      if (team.id === '') {
        const newMember = await db.collection('teams').add(team);
        team.id = String(newMember.id);
        dispatch({ type: 'ADD_TEAM', team });
        return;
      }
      await db.collection(`teams`).doc(team.id).update(team);
      dispatch({ type: 'SET_TEAM', team });
    } catch (err) {
      console.error(err);
    }
  };
};

const deleteTeam = (id: string): ThunkResult<Action, IGlobalState, void> => {
  return async (dispatch) => {
    try {
      await db.collection('teams').doc(id).delete();
      dispatch({ type: 'DELETE_TEAM', id });
    } catch (err) {
      console.error(err);
    }
  };
};

export {
  deleteTeam,
  getTeams,
  upsertTeam,
}