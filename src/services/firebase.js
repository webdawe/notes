import { firebaseConfig } from "config";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
export class firebaseApp {
  static firebaseApp = undefined;
  static auth = undefined;
  static init() {
    this.firebaseApp = initializeApp(firebaseConfig);
    this.auth = getAuth();
  }
}
