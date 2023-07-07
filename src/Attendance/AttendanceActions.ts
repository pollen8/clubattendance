import {
  Action,
  ThunkResult,
} from '../app/Actions';
import { db } from '../fire';
import { IGlobalState } from '../reducers';
import { IAttendance } from './Attendance';
import { IManager } from './AttendanceReducer';

/**
 * Get attendance
 */
const getAttendance = (): ThunkResult<Action, IGlobalState, void> => {
  return async (dispatch) => {
    try {
      const snapshot = await db.collection('attendance').get();
      const attendance: IAttendance[] = [];
      snapshot.forEach((doc) => {
        const record: any = {
          ...doc.data(),
          clubNight: doc.data().clubNight,
          id: String(doc.id),
        }
        attendance.push(record);
      });
      dispatch({ type: 'SET_ATTENDANCE', data: attendance });
    } catch (err) {
      console.error(err);
    }
  };
};

const getClubNightManagers = (): ThunkResult<Action, IGlobalState, void> => {
  return async (dispatch) => {
    try {
      const snapshot = await db.collection('clubNightManager').get();
      const managers: IManager[] = [];
      snapshot.forEach((doc) => {
        const record: any = {
          ...doc.data(),
          id: String(doc.id),
        }
        managers.push(record);
      });
      dispatch({ type: 'SET_CLUB_NIGHT_MANAGERS', data: managers });
    } catch (err) {
      console.error(err);
    }
  };
}

const upsertClubNightManager = (manager: IManager): ThunkResult<Action, IGlobalState, void> => {
  return async (dispatch) => {
    try {
      const snapshot = await db.collection('clubNightManager')
        .where('clubNight', '==', manager.clubNight)
        .get();
      if (snapshot.size > 0) {
        snapshot.docs.forEach((doc) => {
          db.collection(`clubNightManager`).doc(doc.id).update(manager);
        })
        dispatch({ type: 'UPDATE_CLUB_NIGHT_MANAGER', manager });
      } else {
        const newManager = await db.collection('clubNightManager').add(manager);
        manager.id = String(newManager.id);
        dispatch({ type: 'ADD_CLUB_NIGHT_MANAGER', manager });
      }
    } catch (err) {
      console.error(err);
    }
  };
}

const upsertAttendance = (attendance: IAttendance): ThunkResult<Action, IGlobalState, void> => {
  return async (dispatch) => {
    try {
      const snapshot = await db.collection('attendance')
        .where('member', '==', attendance.member)
        .where('clubNight', '==', attendance.clubNight)
        .get();
      if (snapshot.size > 0) {
        snapshot.docs.forEach((doc) => {
          db.collection(`attendance`).doc(doc.id).update(attendance);
        })
        dispatch({ type: 'UPDATE_ATTENDANCE', attendance });
      } else {
        const newAttendance = await db.collection('attendance').add(attendance);
        attendance.id = String(newAttendance.id);
        dispatch({ type: 'ADD_ATTENDANCE', attendance });
      }
    } catch (err) {
      console.error(err);
    }
  };
}

export {
  getAttendance,
  getClubNightManagers,
  upsertAttendance,
  upsertClubNightManager,
}
