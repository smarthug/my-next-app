import { getApp, getApps,initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import 'firebase/compat/firestore';
import { getStorage } from "firebase/storage";
import firebase from "firebase/compat/app"

// const firebaseConfig = {
//   apiKey: "AIzaSyBoeCTcf1So3NZqIyrw5u7fy3AmKjHVEUI",
//   authDomain: "fir-test-ddb02.firebaseapp.com",
//   projectId: "fir-test-ddb02",
//   storageBucket: "fir-test-ddb02.appspot.com",
//   messagingSenderId: "1062048606185",
//   appId: "1:1062048606185:web:8173d5f261c677e9b70d78"
// };


// const firebaseConfig = {
//   apiKey: "AIzaSyAgkjDej_mjv1iaVFWbV6-BGer0I3MnFv0",
//   authDomain: "crowdfunding-minterlab.firebaseapp.com",
//   projectId: "crowdfunding-minterlab",
//   storageBucket: "crowdfunding-minterlab.appspot.com",
//   messagingSenderId: "291636337988",
//   appId: "1:291636337988:web:a32116c63596d5d82f8b11",
//   measurementId: "G-XLR07TV13W"
// };

const firebaseConfig = {
  apiKey: "AIzaSyAgkjDej_mjv1iaVFWbV6-BGer0I3MnFv0",
  authDomain: "crowdfunding-minterlab.firebaseapp.com",
  projectId: "crowdfunding-minterlab",
  storageBucket: "crowdfunding-minterlab.appspot.com",
  messagingSenderId: "291636337988",
  appId: "1:291636337988:web:a32116c63596d5d82f8b11",
  measurementId: "G-XLR07TV13W"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore();

// const app = initializeApp(firebaseConfig);
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);

// export const storage = getStorage(app);

// export const db = getFirestore(app);
