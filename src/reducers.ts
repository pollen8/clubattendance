import { combineReducers } from 'redux';

import attendance, { IAttendanceState } from './Attendance/AttendanceReducer';
import member, { IMemberState } from './Members/MemberReducer';

export interface IGlobalState {
  readonly attendance: IAttendanceState;
  readonly member: IMemberState,
}

const rootReducer = combineReducers({
  attendance,
  member,
});

export default rootReducer;
