import 'firebase/firestore';
import 'firebase/auth';
import firebase from 'firebase/app';

var config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
  apiKey: " AIzaSyA32-a2zvAnoGK-6G_eneEW9yoY7pHhD9c ",
  authDomain: "bhpegasus-71459.firebaseapp.com",
  databaseURL: "https://bhpegasus-71459.firebaseio.com",
  storageBucket: "bhpegasus-71459.appspot.com",
  messagingSenderId: "123123123123",
  projectId: "bhpegasus-71459",
};

export const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // We will display Google as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false
  }
};


var fire = firebase.initializeApp(config);
export default fire;
export const auth = firebase.auth();
export const db = fire.firestore();
