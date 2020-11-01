import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const apiEndPoint = 'https://asia-east2-malork-kantoer.cloudfunctions.net'

const firebaseConfig = {
  apiKey: 'AIzaSyAmKipVVBl171F5NF5oE5dATB19CxIioNE',
  authDomain: 'malork-kantoer.firebaseapp.com',
  databaseURL: 'https://malork-kantoer.firebaseio.com',
  projectId: 'malork-kantoer',
  storageBucket: 'malork-kantoer.appspot.com',
  messagingSenderId: '535302702707',
  appId: '1:535302702707:web:2cb1fd3b6b1ef148ea0c06',
  measurementId: 'G-QGBEWNSYB9',
}
const url = "malorkkan.vercel.app"
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}
const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export {firebase, apiEndPoint, url,month}
