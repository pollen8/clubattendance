import {
  Action,
  ThunkResult,
} from '../app/Actions';
import { db } from '../fire';
import { IGlobalState } from '../reducers';
import { IMember } from './Members';

/**
 * Get members
 */
const getMembers = (): ThunkResult<Action, IGlobalState, void> => {
  return async (dispatch) => {
    try {
      const snapshot = await db.collection('members').get();
      const data: IMember[] = [];
      snapshot.forEach((doc) => {
        const member: any = {
          ...doc.data(),
          id: String(doc.id),
        }
        data.push(member);
      });
      dispatch({ type: 'SET_MEMBERS', data });
    } catch (err) {
      console.error(err);
    }
  };
};

const upsertMember = (member: IMember): ThunkResult<Action, IGlobalState, void> => {
  return async (dispatch) => {
    try {
      if (member.id === '') {
        const newMember = await db.collection('members').add(member);
        member.id = String(newMember.id);
        dispatch({ type: 'ADD_MEMBER', member });
        return;
      }
      await db.collection(`members`).doc(member.id).update(member);
      dispatch({ type: 'SET_MEMBER', member });
    } catch (err) {
      console.error(err);
    }
  };
};

const deleteMember = (id: string): ThunkResult<Action, IGlobalState, void> => {
  return async (dispatch) => {
    try {
      await db.collection('members').doc(id).delete();
      dispatch({ type: 'DELETE_MEMBER', id });
    } catch (err) {
      console.error(err);
    }
  };
};

export {
  deleteMember,
  getMembers,
  upsertMember,
}