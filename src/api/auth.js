//
import { firebaseApp } from "services/firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
export class AuthAPI {
  static async signin(email, password) {
    const response = await signInWithEmailAndPassword(
      firebaseApp.auth,
      email,
      password
    );
    return response.user.toJSON();
  }
  static async signup(email, password) {
    const response = await createUserWithEmailAndPassword(
      firebaseApp.auth,
      email,
      password
    );
    return response.user.toJSON();
  }
  static async signout() {
    signOut(firebaseApp.auth);
  }
}
