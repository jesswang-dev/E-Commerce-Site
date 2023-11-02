// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  initializeAppCheck,
  ReCaptchaEnterpriseProvider,
} from "firebase/app-check";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
/** Notes: According to the firebase documentation, the config object is safe to keep on client side 
 * Source: https://www.youtube.com/watch?v=rQvOAnNvcNQ&t=192s&ab_channel=Firebase
 * Security Rules and App Check in Firebase console are to solve the security problem here.
*/
const firebaseConfig = {
  apiKey: "AIzaSyBKJmk5TwbeQ2JnzfjLs3tQMvMJthP7eL8",
  authDomain: "jesswang-firebase.firebaseapp.com",
  projectId: "jesswang-firebase",
  storageBucket: "jesswang-firebase.appspot.com",
  messagingSenderId: "332270871973",
  appId: "1:332270871973:web:2baced0bf1c96727f2f44c",
  measurementId: "G-E8GDPEQJ0N",
};

// Initialize Firebase
 const firebaseApp = initializeApp(firebaseConfig);

// Create a ReCaptchaEnterpriseProvider instance using your reCAPTCHA Enterprise
// site key and pass it to initializeAppCheck().
const appCheck = initializeAppCheck(firebaseApp, {
  provider: new ReCaptchaEnterpriseProvider("6Lf8O-0oAAAAAKtO1cpPSJ3bFL7HihdKL0Qvq7TA"),
  isTokenAutoRefreshEnabled: true // Set to true to allow auto-refresh.
});

// console.log('Hello there, Firestore!')

export default firebaseApp;