import {
  Action,
  ThunkResult,
} from '../app/Actions';
import { db } from '../fire';
import { IGlobalState } from '../reducers';
import { IMatch } from './Matches';

/**
 * Get matches
 */
const getMatches = (): ThunkResult<Action, IGlobalState, void> => {
  return async (dispatch) => {
    try {
      const snapshot = await db.collection('matches').get();
      const data: IMatch[] = [];
      snapshot.forEach((doc) => {
        const member: any = {
          ...doc.data(),
          id: String(doc.id),
        }
        data.push(member);
      });
      dispatch({ type: 'SET_MATCHES', data });
    } catch (err) {
      console.error(err);
    }
  };
};

const upsertMatch = (match: IMatch): ThunkResult<Action, IGlobalState, void> => {
  return async (dispatch) => {
    try {
      if (match.id === '') {
        const newMatch = await db.collection('matches').add(match);
        match.id = String(newMatch.id);
        dispatch({ type: 'ADD_MATCH', match });
        return;
      }
      await db.collection(`matches`).doc(match.id).update(match);
      dispatch({ type: 'SET_MATCH', match });
    } catch (err) {
      console.error(err);
    }
  };
};

const deleteMatch = (id: string): ThunkResult<Action, IGlobalState, void> => {
  return async (dispatch) => {
    try {
      await db.collection('matches').doc(id).delete();
      dispatch({ type: 'DELETE_MATCH', id });
    } catch (err) {
      console.error(err);
    }
  };
};

export {
  deleteMatch,
  getMatches,
  upsertMatch,
}
