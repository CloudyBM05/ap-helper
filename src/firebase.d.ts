// Type definitions for your Firebase config
// Adjust the exports if you add more to firebase.js
import { Auth } from 'firebase/auth';

declare module '../firebase' {
  export const auth: Auth;
}
