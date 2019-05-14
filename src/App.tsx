import './App.css';

import React from 'react';
import {
  Route,
  Router,
} from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

import { Header } from './app/components/Header';
import Attendance from './Attendance/Attendance';
import FirebaseStore from './firebase';
import history from './history';
import Members from './Members/Members';
import { theme } from './theme';

const Background = styled.div`
  height: 100%;
  color: ${({ theme }) => theme.grey800};
  display: flex;
  flex-direction: column;
`;


function App() {
  return (
    <FirebaseStore>
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <div>
            <Header />
            <Background>
              <div className="App">

              </div>
              <Route path="/" exact render={(props: any) => <Attendance {...props} />} />
              <Route path="/members" render={(props: any) => <Members {...props} />} />
            </Background>
          </div>
        </ThemeProvider>
      </Router>
    </FirebaseStore>
  );
}

export default App;
