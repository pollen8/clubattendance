import produce from 'immer';

import { Action } from '../app/Actions';
import { IClub } from './Clubs';

export interface IClubState {
  data: IClub[]
}

export const initialState: IClubState = {
  data: [],
};


const clubReducer = (state: IClubState = initialState, action: Action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case 'SET_CLUBS':
        draft.data = action.data;
        break;
      case 'ADD_CLUB':
        draft.data.push(action.club);
        break;
      case 'SET_CLUB':
        const index = draft.data.findIndex((member) => member.id === action.club.id);
        draft.data[index] = action.club;
        break;
      case 'DELETE_CLUB':
        draft.data = draft.data.filter((member) => member.id !== action.id);
        break;
    }
  })
};

export default clubReducer;
