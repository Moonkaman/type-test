import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const app = firebase.initializeApp({
  apiKey: "AIzaSyByXeFHRo5UueUy1AqakimLKUe-hq05uGE",
  authDomain: "type-test-4944a.firebaseapp.com",
  projectId: "type-test-4944a",
  storageBucket: "type-test-4944a.appspot.com",
  messagingSenderId: "812848980333",
  appId: "1:812848980333:web:15632de1857211efa1fa64"
})

export const Timestamp = firebase.firestore.Timestamp
export const db = firebase.firestore()
export const auth = app.auth()
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export default app