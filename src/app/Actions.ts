import { ThunkAction } from 'redux-thunk';

import { IAttendance } from '../Attendance/Attendance';
import { IMember } from '../Members/Members';
import { IManager } from '../Attendance/AttendanceReducer';

export declare type ThunkResult<A extends Action = any, S = {}, R = void> = ThunkAction<Promise<R>, S, undefined, A>;

export type Action =
  { type: 'SET_ATTENDANCE', data: IAttendance[] }
  | { type: 'ADD_ATTENDANCE', attendance: IAttendance; }
  | { type: 'UPDATE_ATTENDANCE', attendance: IAttendance; }
  | { type: 'SET_MEMBERS', data: IMember[] }
  | { type: 'SET_MEMBER', member: IMember; }
  | { type: 'ADD_MEMBER', member: IMember; }
  | { type: 'DELETE_MEMBER', id: string }
  | { type: 'SET_CLUB_NIGHT_MANAGERS', data: any[] }
  | { type: 'UPDATE_CLUB_NIGHT_MANAGER', manager: IManager; }
  | { type: 'ADD_CLUB_NIGHT_MANAGER', manager: IManager; };