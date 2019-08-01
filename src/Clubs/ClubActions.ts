import {
  Action,
  ThunkResult,
} from '../app/Actions';
import { db } from '../fire';
import { IGlobalState } from '../reducers';
import { IClub } from './Clubs';

/**
 * Get clubs
 */
const getClubs = (): ThunkResult<Action, IGlobalState, void> => {
  return async (dispatch) => {
    try {
      const snapshot = await db.collection('clubs').get();
      const data: IClub[] = [];
      snapshot.forEach((doc) => {
        const club: any = {
          ...doc.data(),
          id: String(doc.id),
        }
        data.push(club);
      });
      dispatch({ type: 'SET_CLUBS', data });
    } catch (err) {
      console.error(err);
    }
  };
};

const upsertClub = (club: IClub): ThunkResult<Action, IGlobalState, void> => {
  return async (dispatch) => {
    try {
      if (club.id === '') {
        const newClub = await db.collection('clubs').add(club);
        club.id = String(newClub.id);
        dispatch({ type: 'ADD_CLUB', club });
        return;
      }
      await db.collection(`clubs`).doc(club.id).update(club);
      dispatch({ type: 'SET_CLUB', club });
    } catch (err) {
      console.error(err);
    }
  };
};

const deleteClub = (id: string): ThunkResult<Action, IGlobalState, void> => {
  return async (dispatch) => {
    try {
      await db.collection('clubs').doc(id).delete();
      dispatch({ type: 'DELETE_CLUB', id });
    } catch (err) {
      console.error(err);
    }
  };
};

export {
  deleteClub,
  getClubs,
  upsertClub,
}