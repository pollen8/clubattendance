import { combineReducers } from 'redux';

import attendance, { IAttendanceState } from './Attendance/AttendanceReducer';
import member, { IMemberState } from './Members/MemberReducer';
import team, { ITeamState } from './Teams/TeamReducer';

export interface IGlobalState {
  readonly attendance: IAttendanceState;
  readonly member: IMemberState,
  readonly team: ITeamState,
}

const rootReducer = combineReducers({
  attendance,
  member,
  team,
});

export default rootReducer;
