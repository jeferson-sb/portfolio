import firebase from 'firebase/app'
import 'firebase/analytics'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: '',
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: '',
  messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
}

firebase.initializeApp(firebaseConfig)

export default firebase
