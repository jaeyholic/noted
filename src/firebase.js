import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCDcr1y5nDXu2yPhHMtcYbnH_go_-TKUY4',
  authDomain: 'noted-a16b6.firebaseapp.com',
  databaseURL: 'https://noted-a16b6.firebaseio.com',
  projectId: 'noted-a16b6',
  storageBucket: 'noted-a16b6.appspot.com',
  messagingSenderId: '798675216744',
  appId: '1:798675216744:web:4514be9676ca1341'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
window.firebase = firebase;
export const auth = firebase.auth();
export const firestore = firebase.firestore();

firebase.settings = { timestampsInSnapshots: true };

export default firebase;
