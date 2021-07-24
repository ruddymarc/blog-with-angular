import { User } from "../models/user.model";
import * as firebase from "firebase";

export class AuthService {

  constructor() { }

  getCurrentUser = (): User | null => {
    const user = firebase.default.auth().currentUser;
    return user ? new User(user.uid, user.displayName, user.email, user.phoneNumber, user.photoURL) : user;
  }
  updateProfile = (firstName: string, lastName?: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const fullName: string = lastName ? `${firstName} ${lastName}` : firstName;
      firebase.default.auth().currentUser?.updateProfile({ displayName: fullName }).then(
        () => { resolve(); },
        (error) => { reject(error); }
      );
    });
  }
  signUp = (email: string, password: string): Promise<firebase.default.auth.UserCredential> => {
    return new Promise((resolve, reject) => {
      firebase.default.auth().createUserWithEmailAndPassword(email, password).then(
        credential => { resolve(credential); },
        error => { reject(error); }
      );
    });
  }
  signIn = (email: string, password: string): Promise<firebase.default.auth.UserCredential> => {
    return new Promise((resolve, reject) => {
      firebase.default.auth().signInWithEmailAndPassword(email, password).then(
        credential => { resolve(credential); },
        error => { reject(error); }
      );
    });
  }
  signOut = (): void => {
    firebase.default.auth().signOut();
  }

  isAuth = (): boolean => {
    return null != firebase.default.auth().currentUser;
  }
  isCurrentUser = (user: User|null): boolean | null => {
    return user && user.uid === this.getCurrentUser()?.uid;
  }
}
