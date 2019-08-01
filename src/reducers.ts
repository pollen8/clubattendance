import { combineReducers } from 'redux';

import attendance, { IAttendanceState } from './Attendance/AttendanceReducer';
import club, { IClubState } from './Clubs/ClubReducer';
import member, { IMemberState } from './Members/MemberReducer';
import team, { ITeamState } from './Teams/TeamReducer';

export interface IGlobalState {
  readonly attendance: IAttendanceState;
  readonly club: IClubState;
  readonly member: IMemberState,
  readonly team: ITeamState,
}

const rootReducer = combineReducers({
  attendance,
  club,
  member,
  team,
});

export default rootReducer;
