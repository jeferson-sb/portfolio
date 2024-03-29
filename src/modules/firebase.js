import { VueFire, VueFireAppCheck } from 'vuefire'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { ReCaptchaV3Provider } from 'firebase/app-check'

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
    modules: [
      VueFireAppCheck({
        provider: new ReCaptchaV3Provider(import.meta.env.VITE_RECAPTCHA),
        debug: process.env.NODE_ENV !== 'production',
        isTokenAutoRefreshEnabled: true,
      }),
    ]
  })
}