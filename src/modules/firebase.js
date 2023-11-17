import { VueFire } from 'vuefire'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Initialize Firebase
export const firebaseApp = initializeApp({
  apiKey: "AIzaSyBmwcdM6SlakmUiBIf_hGrKXDv-5U_WbSU",
  authDomain: "portfolio-d3c7c.firebaseapp.com",
  projectId: "portfolio-d3c7c",
  storageBucket: "portfolio-d3c7c.appspot.com",
  databaseURL: 'https://portfolio-d3c7c-default-rtdb.firebaseio.com/',
})

export const db = getFirestore(firebaseApp)

export const install = ({ isClient, app }) => {
  app.use(VueFire, {
    firebaseApp,
  })
}
