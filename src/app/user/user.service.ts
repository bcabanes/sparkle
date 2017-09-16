import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import 'rxjs/operator/first';

@Injectable()
export class UserService {

  constructor(private afAuth: AngularFireAuth) {}

  public getCurrentUser(): Observable<firebase.User> {
    return this.afAuth.authState.first();
  }

  public signIn(email: string, password: string): firebase.Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  public signUp(email: string, password: string): firebase.Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  public signOut(): firebase.Promise<any> {
    return this.afAuth.auth.signOut();
  }
}
