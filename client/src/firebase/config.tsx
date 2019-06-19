import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/auth';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyAxPHdCQWS5bEYnJh6JOJacSnD1_QHpcxk",
  authDomain: "weekly-planner-2a8f7.firebaseapp.com",
  databaseURL: "https://weekly-planner-2a8f7.firebaseio.com",
  projectId: "weekly-planner-2a8f7",
  storageBucket: "weekly-planner-2a8f7.appspot.com",
  messagingSenderId: "363921405032"
};
firebase.initializeApp(config);
  
export const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

export default config;