import firebase from 'firebase/app';

import {getAuth} from 'firebase/auth';
import {getDatabase} from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyC9WdL66Ge4JKbSzNDHxX9sK1hS9bIeArU",
  authDomain: "letmeask-19edd.firebaseapp.com",
  databaseURL: "https://letmeask-19edd-default-rtdb.firebaseio.com",
  projectId: "letmeask-19edd",
  storageBucket: "letmeask-19edd.appspot.com",
  messagingSenderId: "827487382312",
  appId: "1:827487382312:web:078438ec90bec4b862be1d"
};

firebase.initializeApp(firebaseConfig);

export const auth = getAuth();
export const database = getDatabase();