import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDtitUKBCtPdeOTbf45HjNAKEshIoBrdj8",
  authDomain: "notebook-app-c7445.firebaseapp.com",
  projectId: "notebook-app-c7445",
  storageBucket: "notebook-app-c7445.appspot.com",
  messagingSenderId: "140167252475",
  appId: "1:140167252475:web:ff8cf6b9f36ff3e312a35e",
  measurementId: "G-V2CJW44W9W",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
