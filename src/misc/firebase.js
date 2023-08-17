import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
  apiKey: 'AIzaSyCiBhq_RFVP0fJn1McRwYvzc92SNvmMuwU',
  authDomain: 'chat-w-app-2.firebaseapp.com',
  databaseURL: 'https://chat-w-app-2-default-rtdb.firebaseio.com',
  projectId: 'chat-w-app-2',
  storageBucket: 'chat-w-app-2.appspot.com',
  messagingSenderId: '405669083330',
  appId: '1:405669083330:web:bf699df07adc9eb5b2235b',
};

const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();
