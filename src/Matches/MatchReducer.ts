import produce from 'immer';

import { Action } from '../app/Actions';
import { IMatch } from './Matches';

export interface IMatchState {
  data: IMatch[]
}

export const initialState: IMatchState = {
  data: [],
};


const matchReducer = (state: IMatchState = initialState, action: Action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case 'SET_MATCHES':
        draft.data = action.data;
        break;
      case 'ADD_MATCH':
        draft.data.push(action.match);
        break;
      case 'SET_MATCH':
        const index = draft.data.findIndex((member) => member.id === action.match.id);
        draft.data[index] = action.match;
        break;
      case 'DELETE_MATCH':
        draft.data = draft.data.filter((member) => member.id !== action.id);
        break;
    }
  })
};

export default matchReducer;
