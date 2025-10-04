import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCpj-qvtUOKMGRcvYlWgO_jg-U8O9VV8k8",
  authDomain: "ap-helper-7a6ac.firebaseapp.com",
  projectId: "ap-helper-7a6ac",
  storageBucket: "ap-helper-7a6ac.firebasestorage.app",
  messagingSenderId: "474747866896",
  appId: "1:474747866896:web:a3f2e9c0b0b1e2f3g4h5i6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
