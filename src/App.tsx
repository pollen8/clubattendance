import './App.css';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import firebase from 'firebase/compat/app';
import React, {
  createContext,
  useEffect,
  useState,
} from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Provider } from 'react-redux';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

import { Header } from './app/components/Header';
import store from './app/store';
import Attendance from './Attendance/Attendance';
import Clubs from './Clubs/Clubs';
import {
  auth,
  uiConfig,
} from './fire';
import Matches from './Matches/Matches';
import Members from './Members/Members';
import Teams from './Teams/Teams';
import { theme } from './theme';

const Background = styled.div`
  height: 100%;
  color: ${({ theme }) => theme.grey800};
  display: flex;
  flex-direction: column;
`;

export const UserContext = createContext<firebase.User | null>(null);


function App() {
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged(
      (user) => {
        setUser(user);
      }
    );
    return () => unregisterAuthObserver();
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <UserContext.Provider value={user}>
            <div>
              <Header />
              <Background className="background">

                {
                  !user &&
                  <div className="app-auth">
                    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
                  </div>
                }

                {
                  user && <Routes>
                    <Route path="/" element={<Attendance />} />
                    <Route path="/members" element={<Members />} />
                    <Route path="/teams" element={<Teams />} />
                    <Route path="/clubs" element={<Clubs />} />
                    <Route path="/matches" element={<Matches />} />
                  </Routes>
                }
              </Background>
            </div>
          </UserContext.Provider>
        </ThemeProvider>
      </BrowserRouter>
      <div id="destination" />
    </Provider>
  );
}

export default App;
