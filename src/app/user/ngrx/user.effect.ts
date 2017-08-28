import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
// app
import { UserActions } from './user.action';
import { UserService } from '../user.service';
import { User } from './user.state';

@Injectable()
export class UserEffects {

  @Effect() signInEmail$: Observable<Action> = this.actions$
    .ofType<UserActions.SignInEmailAction>(UserActions.ActionTypes.SIGN_IN_EMAIL)
    .switchMap((action: UserActions.SignInEmailAction) => {
      return Observable.fromPromise(
        this.userService.signIn(action.payload.email, action.payload.password))
        .map((response: any) => {
          console.log(response);
          return new UserActions.SignInSuccessAction(response);
        })
        .catch((error) => Observable.of(new UserActions.SignInFailureAction(error)));
    });

  @Effect() signInSuccess$: Observable<Action> = this.actions$
    .ofType<UserActions.SignInSuccessAction | UserActions.SignUpSuccessAction>(
      UserActions.ActionTypes.SIGN_IN_SUCCESS,
      UserActions.ActionTypes.SIGN_UP_SUCCESS)
    .map((action: UserActions.SignInSuccessAction) => {
      const user: User = {
        displayName  : action.payload.displayName,
        email        : action.payload.email,
        emailVerified: action.payload.emailVerified,
        phoneNumber  : action.payload.phoneNumber,
        photoURL     : action.payload.photoURL,
        providerId   : action.payload.providerId,
        uid          : action.payload.uid,
        isAnonymous  : action.payload.isAnonymous,
      };
      return new UserActions.ChangedAction({ current: user, errors: [] });
    });

  @Effect() signUp$: Observable<Action> = this.actions$
    .ofType<UserActions.SignUpAction>(UserActions.ActionTypes.SIGN_UP)
    .switchMap((action: UserActions.SignUpAction) => {
      return Observable.fromPromise(
        this.userService.signUp(action.payload.email, action.payload.password))
        .map((response: any) => new UserActions.SignUpSuccessAction(response))
        .catch((error) => Observable.of(new UserActions.SignUpFailureAction(error)));
    });

  @Effect() apiError$: Observable<Action> = this.actions$
    .ofType<UserActions.ApiErrorAction | UserActions.SignInFailureAction>(
      UserActions.ActionTypes.API_ERROR,
      UserActions.ActionTypes.SIGN_IN_FAILURE,
      UserActions.ActionTypes.SIGN_UP_FAILURE
    )
    .withLatestFrom(this.store)
    .map(([ action, state ]) => new UserActions.ChangedAction({
      errors: [ action.payload, ...(state.errors || []) ]
    }));

  constructor(private actions$: Actions,
              private store: Store<any>,
              private userService: UserService) {
  }
}
