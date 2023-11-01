// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoeCTcf1So3NZqIyrw5u7fy3AmKjHVEUI",
  authDomain: "fir-test-ddb02.firebaseapp.com",
  projectId: "fir-test-ddb02",
  storageBucket: "fir-test-ddb02.appspot.com",
  messagingSenderId: "1062048606185",
  appId: "1:1062048606185:web:8173d5f261c677e9b70d78"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)


