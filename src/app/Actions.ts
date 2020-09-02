import { ThunkAction } from 'redux-thunk';

import { IAttendance } from '../Attendance/Attendance';
import { IManager } from '../Attendance/AttendanceReducer';
import { IClub } from '../Clubs/Clubs';
import { IMember } from '../Members/Members';
import { ITeam } from '../Teams/Teams';
import { IMatch } from '../Matches/Matches';

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
  | { type: 'ADD_CLUB_NIGHT_MANAGER', manager: IManager; }
  | { type: 'SET_TEAMS', data: ITeam[]; }
  | { type: 'ADD_TEAM', team: ITeam; }
  | { type: 'SET_TEAM', team: ITeam; }
  | { type: 'DELETE_TEAM', id: string; }
  | { type: 'SET_CLUBS', data: IClub[]; }
  | { type: 'ADD_CLUB', club: IClub; }
  | { type: 'SET_CLUB', club: IClub; }
  | { type: 'DELETE_CLUB', id: string; }
  | { type: 'SET_MATCHES', data: IMatch[]; }
  | { type: 'ADD_MATCH', match: IMatch; }
  | { type: 'SET_MATCH', match: IMatch; }
  | { type: 'DELETE_MATCH', id: string; }