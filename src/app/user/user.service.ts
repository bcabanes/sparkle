import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class UserService {

  constructor(private afAuth: AngularFireAuth) {}

  public signIn(email: string, password: string): firebase.Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  public signUp(email: string, password: string): firebase.Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }
}
