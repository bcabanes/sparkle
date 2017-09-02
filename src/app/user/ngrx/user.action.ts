import { Action } from '@ngrx/store';
// app
import { type } from '../../shared/helpers/type';
import { UserState } from './user.state';

export namespace UserActions {
  const CATEGORY = 'User';

  export interface IUserActions {
    API_ERROR: string;
    CHANGED: string;
    INIT: string;
    SIGN_IN_EMAIL: string;
    SIGN_IN_SOCIAL: string;
    SIGN_IN_SUCCESS: string;
    SIGN_IN_FAILURE: string;
    SIGN_OUT: string;
    SIGN_OUT_SUCCESS: string;
    SIGN_UP: string;
    SIGN_UP_FAILURE: string;
    SIGN_UP_SUCCESS: string;
    UPDATE: string;
  }

  export const ActionTypes: IUserActions = {
    API_ERROR       : type(`${CATEGORY} Api Error`),
    CHANGED         : type(`${CATEGORY} Changed`),
    INIT: type(`${CATEGORY} Initialization`),
    SIGN_IN_EMAIL   : type(`${CATEGORY} Sign in with email`),
    SIGN_IN_FAILURE : type(`${CATEGORY} Sign in Failure`),
    SIGN_IN_SUCCESS : type(`${CATEGORY} Sign in Success`),
    SIGN_IN_SOCIAL  : type(`${CATEGORY} Sign in with social providers`),
    SIGN_OUT        : type(`${CATEGORY} Sign out`),
    SIGN_OUT_SUCCESS: type(`${CATEGORY} Sign out Success`),
    SIGN_UP         : type(`${CATEGORY} Sign up`),
    SIGN_UP_FAILURE : type(`${CATEGORY} Sign up Failure`),
    SIGN_UP_SUCCESS : type(`${CATEGORY} Sign up Finish`),
    UPDATE          : type(`${CATEGORY} Update`)
  };

  export class ApiErrorAction implements Action {
    type = ActionTypes.API_ERROR;

    /**
     *
     * @param payload
     */
    constructor(public payload: any) {
    }
  }

  /**
   * User has changed; register changes in AppStore.
   * Not intended to be used directly.
   */
  export class ChangedAction implements Action {
    type = ActionTypes.CHANGED;

    /**
     *
     * @param {UserState.IState} payload
     */
    constructor(public payload: UserState.IState) {
    }
  }

  export class InitAction implements Action {
    type = ActionTypes.INIT;
    payload: string = null;
  }

  /**
   * Authentication
   */
  export class SignInEmailAction implements Action {
    type = ActionTypes.SIGN_IN_EMAIL;

    /**
     *
     * @param {{email: string; password: string}} payload
     */
    constructor(public payload: { email: string, password: string }) {
    }
  }

  export class SignInFailureAction implements Action {
    type = ActionTypes.SIGN_IN_FAILURE;

    /**
     *
     * @param payload
     */
    constructor(public payload: any) {
    }
  }

  export class SignInSuccessAction implements Action {
    type = ActionTypes.SIGN_IN_SUCCESS;

    /**
     *
     * @param payload
     */
    constructor(public payload: any) {
    }
  }

  export class SignUpAction implements Action {
    type = ActionTypes.SIGN_UP;

    constructor(public payload: { email: string, password: string }) {
    }
  }

  export class SignUpFailureAction implements Action {
    type = ActionTypes.SIGN_UP_FAILURE;

    /**
     *
     * @param payload
     */
    constructor(public payload: any) {
    }
  }

  export class SignUpSuccessAction implements Action {
    type = ActionTypes.SIGN_UP_SUCCESS;

    constructor(public payload: any) {
    }
  }

  export type Actions =
    ApiErrorAction |
    ChangedAction |
    InitAction |
    SignInEmailAction |
    SignInFailureAction |
    SignInSuccessAction |
    SignUpAction |
    SignUpFailureAction |
    SignUpSuccessAction;
}