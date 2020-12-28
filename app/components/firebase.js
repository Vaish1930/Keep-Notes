import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB1wlSki2y1KMDozRXH4ceLDiDVIEob_TM",
  authDomain: "keepnotes-dca33.firebaseapp.com",
  projectId: "keepnotes-dca33",
  storageBucket: "keepnotes-dca33.appspot.com",
  messagingSenderId: "134582325693",
  appId: "1:134582325693:web:db43d2588f734c352342d4",
  measurementId: "G-GRLC84S0D3",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebaseApp.firestore();

export { auth };
export default db;
