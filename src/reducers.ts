import {
  TypedUseSelectorHook,
  useSelector,
} from 'react-redux';
import { combineReducers } from 'redux';

import attendance, { IAttendanceState } from './Attendance/AttendanceReducer';
import club, { IClubState } from './Clubs/ClubReducer';
import match, { IMatchState } from './Matches/MatchReducer';
import member, { IMemberState } from './Members/MemberReducer';
import team, { ITeamState } from './Teams/TeamReducer';

export interface IGlobalState {
  readonly attendance: IAttendanceState;
  readonly club: IClubState;
  readonly match: IMatchState,
  readonly member: IMemberState,
  readonly team: ITeamState,
}

const rootReducer = combineReducers({
  attendance,
  club,
  match,
  member,
  team,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>
export const useAppSelector: TypedUseSelectorHook<IGlobalState> = useSelector
