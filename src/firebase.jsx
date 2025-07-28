import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.useDeviceLanguage();

const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// const setUpRecaptcha = (phoneNumber, containerId = "recaptcha-container") => {
//   return new Promise((resolve, reject) => {
//     const recaptchaVerifier = new RecaptchaVerifier(
//       containerId,
//       {
//         size: "invisible",
//         callback: () => console.log("reCAPTCHA verified!"),
//         "expired-callback": () => reject(new Error("reCAPTCHA expired. Try again."))
//       },
//       auth
//     );

//     signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
//       .then((confirmationResult) => resolve(confirmationResult))
//       .catch((error) => reject(error));
//   });  
// };

export { auth, db, googleProvider };