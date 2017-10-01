import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
// app
import { UserActions } from './user.action';
import { UserService } from '../user.service';
import { IUser, User } from '../user.model';
import { AppActions, IAppState } from '../../ngrx/app.action';

@Injectable()
export class UserEffects {

  @Effect() signInEmail$: Observable<Action> = this.actions$
    .ofType(UserActions.ActionTypes.SIGN_IN_EMAIL)
    .exhaustMap((action: UserActions.SignInEmailAction) =>
      Observable.fromPromise(
        this.userService.signIn(action.payload.email, action.payload.password))
        .map((user: IUser) => new UserActions.SignInSuccessAction(user))
        .catch((error) => Observable.of(new UserActions.SignInFailureAction(error))));

  @Effect() signInSuccess$: Observable<Action> = this.actions$
    .ofType(UserActions.ActionTypes.SIGN_IN_SUCCESS, UserActions.ActionTypes.SIGN_UP_SUCCESS)
    .map((action: UserActions.SignInSuccessAction) => {
      const user: User = new User(action.payload);
      return new UserActions.ChangedAction({ current: user.serialize(), errors: [] });
    })
    .do(() => this.router.navigate([ '/dashboard' ]));

  @Effect() signUp$: Observable<Action> = this.actions$
    .ofType(UserActions.ActionTypes.SIGN_UP)
    .exhaustMap((action: UserActions.SignUpAction) => Observable.fromPromise(
        this.userService.signUp(action.payload.email, action.payload.password))
        .map((user: IUser) => new UserActions.SignUpSuccessAction(user))
        .catch((error) => Observable.of(new UserActions.SignUpFailureAction(error))));

  @Effect() signOut$: Observable<Action> = this.actions$
    .ofType(UserActions.ActionTypes.SIGN_OUT)
    .exhaustMap((action: UserActions.SignOutAction) => Observable.fromPromise(
        this.userService.signOut())
        .map(() => new UserActions.SignOutSuccessAction())
        .catch((error) => Observable.of(new UserActions.SignOutFailureAction(error))));

  @Effect() signOutSuccess$: Observable<Action> = this.actions$
    .ofType(UserActions.ActionTypes.SIGN_IN_REDIRECT, UserActions.ActionTypes.SIGN_OUT_SUCCESS)
    .map((action: UserActions.SignOutSuccessAction) =>
      new UserActions.ChangedAction({ current: null, errors: [] }))
    .do(() => this.router.navigate([ '/auth', 'sign-in' ]));

  @Effect() update$: Observable<Action> = this.actions$
    .ofType(UserActions.ActionTypes.UPDATE)
    .exhaustMap((action: UserActions.UpdateAction) => Observable.fromPromise(
      this.userService.update(action.payload))
      .map((user: IUser) => new UserActions.UpdateSuccessAction(user))
      .catch((error) => Observable.of(new UserActions.UpdateFailureAction(error))));

  @Effect() updateSuccess$: Observable<Action> = this.actions$
    .ofType(UserActions.ActionTypes.UPDATE_SUCCESS)
    .map((action: UserActions.UpdateSuccessAction) =>
      new UserActions.ChangedAction({ current: action.payload, errors: [] }));

  @Effect() apiError$: Observable<Action> = this.actions$
    .ofType(UserActions.ActionTypes.API_ERROR,
      UserActions.ActionTypes.SIGN_IN_FAILURE,
      UserActions.ActionTypes.SIGN_UP_FAILURE,
      UserActions.ActionTypes.SIGN_OUT_FAILURE,
      UserActions.ActionTypes.UPDATE_FAILURE)
    .withLatestFrom(this.store)
    .map(([ action, state ]: [ UserActions.Actions, IAppState ]) =>
      new UserActions.ChangedAction({ errors: [ action.payload, ...(state.user.errors || []) ] }));

  @Effect() init$: Observable<Action> = this.actions$
    .ofType(UserActions.ActionTypes.INIT)
    .startWith(new UserActions.InitAction())
    .switchMap((action: UserActions.InitAction) =>
      this.userService.getCurrentUser()
        .map((firebaseUser) => {
          if (!firebaseUser) {
            return new AppActions.NoopAction(); // Do nothing.
          }
          const user: User = new User(firebaseUser);
          return new UserActions.ChangedAction({ current: user.serialize(), errors: [] });
        }));

  constructor(private actions$: Actions,
              private router: Router,
              private store: Store<IAppState>,
              private userService: UserService) {
  }
}
