import produce from 'immer';

import { Action } from '../app/Actions';
import { IMember } from './Members';

export interface IMemberState {
  data: IMember[]
}

export const initialState: IMemberState = {
  data: [],
};


const memberReducer = (state: IMemberState = initialState, action: Action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case 'SET_MEMBERS':
        draft.data = action.data;
        break;
      case 'ADD_MEMBER':
        draft.data.push(action.member);
        break;
      case 'SET_MEMBER':
        const index = draft.data.findIndex((member) => member.id === action.member.id);
        draft.data[index] = action.member;
        break;
      case 'DELETE_MEMBER':
        draft.data = draft.data.filter((member) => member.id !== action.id);
        break;
    }
  })
};

export default memberReducer;
