// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB4RxAt0MEB613vxVLcaFZ0s8AdAERq5tI",
  authDomain: "flashvolve-creative-platform.firebaseapp.com",
  projectId: "flashvolve-creative-platform",
  storageBucket: "flashvolve-creative-platform.appspot.com",
  messagingSenderId: "264377167105",
  appId: "1:264377167105:web:471fa2bf975926eeff7f00",
  measurementId: "G-BC2EPGLQJC"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth }
