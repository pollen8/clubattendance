import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useReducer,
} from 'react';

import { IAttendance } from './Attendance/Attendance';
import { db } from './fire';
import { IMember } from './Members/Members';

export interface IClubNightManager {
  member: IMember;
  clubNight: number;
}

interface IStore {
  activeDate: Date;
  attendance: IAttendance[];
  members: IMember[];
  clubNightManagers: IClubNightManager[];
}

interface IContext {
  state: IStore,
  dispatch?: any;
}

const initialState: IStore = {
  activeDate: new Date(),
  attendance: [],
  clubNightManagers: [],
  members: [],
};

export const FirebaseContext = createContext<IContext>({
  state: initialState,
});

type TAction =
  | { type: 'ADD_ATTENDANCE', attendance: IAttendance; }
  | { type: 'ADD_MEMBER', member: IMember; }
  | { type: 'SET_MEMBERS', members: IMember[]; }
  | { type: 'REMOVE_MEMBER', id: string; }
  | { type: 'UPSERT_ATTENDANCE', attendance: IAttendance; }
  | { type: 'UPSERT_CLUBNIGHT_MANAGER', manager: IClubNightManager; }
  | { type: 'UPSERT_MEMBER', member: IMember; }
  | { type: 'SET_ATTENDACE', attendance: IAttendance[]; }
  | { type: 'SET_CLUBNIGHT_MANAGERS', managers: IClubNightManager[]; }
  | { type: 'SET_ATTENDACE_RECORD', record: IAttendance }
  | { type: 'SET_ACTIVE_DATE', date: Date };

const reducer = (state: IStore, action: TAction): IStore => {
  switch (action.type) {
    case 'ADD_MEMBER':
      db.collection('members').add(action.member);
      return { ...state, members: [action.member].concat(state.members) };
    case 'ADD_ATTENDANCE':
      return { ...state, attendance: [action.attendance].concat(state.attendance) };
    case 'REMOVE_MEMBER':
      db.collection('members').doc(action.id).delete();
      return { ...state, members: state.members.filter((member) => member.id !== action.id) };
    case 'SET_CLUBNIGHT_MANAGERS':
      return { ...state, clubNightManagers: action.managers };
    case 'SET_MEMBERS':
      return { ...state, members: action.members };
    case 'SET_ATTENDACE':
      return { ...state, attendance: action.attendance };
    case 'SET_ACTIVE_DATE':
      return { ...state, activeDate: action.date };
    case 'UPSERT_MEMBER':
      if (action.member.id === '') {
        db.collection('members').add(action.member);
        return { ...state, members: [action.member].concat(state.members) };
      }
      db.collection(`members`).doc(action.member.id).update(action.member).then(() => console.log('updated', action.member));
      const newMembers = state.members.map((member) => {
        return member.id === action.member.id
          ? action.member
          : member;
      });
      return { ...state, members: newMembers };
    case 'UPSERT_CLUBNIGHT_MANAGER':
      db.collection('clubNightManager')
        .where('clubNight', '==', action.manager.clubNight)
        .get().then((snapshot) => {
          if (snapshot.size > 0) {
            snapshot.docs.forEach((doc) => {
              db.collection(`clubNightManager`).doc(doc.id).update(action.manager);
            })
          } else {
            db.collection('clubNightManager').add(action.manager);
          }
        });
      return state;
    case 'UPSERT_ATTENDANCE':
      db.collection('attendance')
        .where('member', '==', action.attendance.member)
        .where('clubNight', '==', action.attendance.clubNight)
        .get().then((snapshot) => {
          if (snapshot.size > 0) {
            snapshot.docs.forEach((doc) => {
              db.collection(`attendance`).doc(doc.id).update(action.attendance);
            })
          } else {
            db.collection('attendance').add(action.attendance);
          }
        });
      return { ...state };
  }
  return state;
};

const FirebaseStore: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async () => {
      const snapshot = await db.collection('members').get();
      const members: any[] = [];
      snapshot.forEach((doc) => {
        const member: any = {
          ...doc.data(),
          id: String(doc.id),
        }
        members.push(member);
      });
      dispatch({ type: 'SET_MEMBERS', members });
    })();
  }, []);

  useEffect(() => {
    (async () => {
      console.log('get attendance');
      const snapshot = await db.collection('attendance').get();
      const attendance: any[] = [];
      snapshot.forEach((doc) => {
        const record: any = {
          ...doc.data(),
          clubNight: doc.data().clubNight,
          id: String(doc.id),
        }
        attendance.push(record);
      });
      dispatch({ type: 'SET_ATTENDACE', attendance });
    })();
  }, [state.activeDate]);

  useEffect(() => {
    (async () => {
      const snapshot = await db.collection('clubNightManager').get();
      const managers: any[] = [];
      snapshot.forEach((doc) => {
        const record: any = {
          ...doc.data(),
          id: String(doc.id),
        }
        managers.push(record);
      });
      dispatch({ type: 'SET_CLUBNIGHT_MANAGERS', managers });
    })();
  }, []);

  return (
    <FirebaseContext.Provider value={{ state, dispatch }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseStore;

export const useStateValue = () => useContext(FirebaseContext);