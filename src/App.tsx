import './App.css';

import React, {
  createContext,
  useEffect,
  useState,
} from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Provider } from 'react-redux';
import {
  Route,
  Router,
} from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

import { Header } from './app/components/Header';
import store from './app/store';
import Attendance from './Attendance/Attendance';
import {
  auth,
  uiConfig,
} from './fire';
import history from './history';
import Members from './Members/Members';
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
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <UserContext.Provider value={user}>
            <div>
              <Header />
              <Background>
                <div className="App">
                  {
                    !user &&
                    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
                  }
                </div>
                {
                  user && <>
                    <Route path="/" exact render={(props: any) => <Attendance {...props} />} />
                    <Route path="/members" render={(props: any) => <Members {...props} />} />
                  </>
                }
              </Background>
            </div>
          </UserContext.Provider>
        </ThemeProvider>
      </Router>
      <div id="destination" />
    </Provider>
  );
}

export default App;
