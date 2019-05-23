import produce from 'immer';

import { Action } from '../app/Actions';
import { IMember } from '../Members/Members';
import { IAttendance } from './Attendance';

export interface IAttendanceState {
  data: IAttendance[]
  clubNightManagers: IManager[],
}

export interface IManager {
  id: string;
  clubNight: number;
  member: IMember;
}

export const initialState: IAttendanceState = {
  data: [],
  clubNightManagers: [],
};


const attendancereducer = (state: IAttendanceState = initialState, action: Action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case 'SET_ATTENDANCE':
        draft.data = action.data;
        break;
      case 'SET_CLUB_NIGHT_MANAGERS':
        draft.clubNightManagers = action.data;
        break;
      case 'ADD_ATTENDANCE':
        draft.data.push(action.attendance);
        break;
      case 'UPDATE_ATTENDANCE':
        {
          const index = draft.data.findIndex((attendance) => attendance.id === action.attendance.id);
          draft.data[index] = action.attendance;
          break;
        }
      case 'ADD_CLUB_NIGHT_MANAGER':
        draft.clubNightManagers.push(action.manager);
        break;
      case 'UPDATE_CLUB_NIGHT_MANAGER':
        {
          const index = draft.clubNightManagers.findIndex((attendance) => attendance.id === action.manager.id);
          draft.clubNightManagers[index] = action.manager;
        }
    }
  })

};

export default attendancereducer;
