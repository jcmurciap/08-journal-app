
import 'firebase/firestore';
import 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPIID,
    
};
  
// const firebaseConfigTesting = {
//     apiKey: "AIzaSyCU6Z6yoi2DprVOMMLW4_QfGecLIrNlNqM",
//     authDomain: "sql-demos-d98f7.firebaseapp.com",
//     projectId: "sql-demos-d98f7",
//     storageBucket: "sql-demos-d98f7.appspot.com",
//     messagingSenderId: "624844650207",
//     appId: "1:624844650207:web:d20f1934cfd31d34f21b6a",
//     measurementId: "G-ECZTBZL9KC"
//   };

// if (process.env.NODE_ENV === 'test') {
//     // testing
//     initializeApp( firebaseConfigTesting );
// } else {
//     // dev/prod
//     initializeApp( firebaseConfig );
// }

initializeApp( firebaseConfig )

// Initialize Firebase
const db = getFirestore();
const googleAuthProvider =  new GoogleAuthProvider();

export {
    db,
    googleAuthProvider,

}
