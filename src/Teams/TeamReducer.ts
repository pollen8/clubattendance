import produce from 'immer';

import { Action } from '../app/Actions';
import { ITeam } from './Teams';

export interface ITeamState {
  data: ITeam[]
}

export const initialState: ITeamState = {
  data: [],
};


const memberReducer = (state: ITeamState = initialState, action: Action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case 'SET_TEAMS':
        draft.data = action.data;
        break;
      case 'ADD_TEAM':
        draft.data.push(action.team);
        break;
      case 'SET_TEAM':
        const index = draft.data.findIndex((member) => member.id === action.team.id);
        draft.data[index] = action.team;
        break;
      case 'DELETE_TEAM':
        draft.data = draft.data.filter((member) => member.id !== action.id);
        break;
    }
  })
};

export default memberReducer;
