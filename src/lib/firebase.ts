// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBeWRnLCkw8YpORdFhuuAlfqGPo5hcDfj8",
  authDomain: "wedding-invitation-19bc7.firebaseapp.com",
  projectId: "wedding-invitation-19bc7",
  storageBucket: "wedding-invitation-19bc7.firebasestorage.app",
  messagingSenderId: "476661743360",
  appId: "1:476661743360:web:6958672a20a66564d73de5",
  measurementId: "G-0XLKP49JTY"
};

// Initialize Firebase only if it hasn't been initialized already
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Analytics (only on client-side and if supported)
let analytics: any = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { analytics };

// For development: Connect to Firestore emulator if in development mode
// Uncomment the lines below if you want to use Firestore emulator in development
// if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
//   try {
//     connectFirestoreEmulator(db, 'localhost', 8080);
//   } catch (error) {
//     console.debug('Firestore emulator connection info:', error);
//   }
// }

export default app;