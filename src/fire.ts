import firebase from 'firebase/app';
import 'firebase/database';
import "firebase/firestore";

var config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
  apiKey: " AIzaSyA32-a2zvAnoGK-6G_eneEW9yoY7pHhD9c ",
  authDomain: "bhpegasus-71459.firebaseapp.com",
  databaseURL: "https://bhpegasus-71459.firebaseio.com",
  storageBucket: "bhpegasus-71459.appspot.com",
  messagingSenderId: "123123123123",
  projectId: "bhpegasus-71459",
};
var fire = firebase.initializeApp(config);
export default fire;
export const db = fire.firestore();
