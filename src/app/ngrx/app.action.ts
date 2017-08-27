import { Action } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';
import { type } from '../shared/helpers/type';
import { RouterStateUrl } from '../shared/helpers/custom-router-state-serializer';

export interface IAppState {
  router: RouterReducerState<RouterStateUrl>;
}

export namespace AppActions {
  const CATEGORY = 'App';

  export interface IActions {
    NOOP: string;
  }

  export const ActionTypes: IActions = {
    NOOP: type(`${CATEGORY} Noop`)
  };

  export class NoopAction implements Action {
    type = ActionTypes.NOOP;
    payload: string = null;
  }

  export type Actions = NoopAction;
}
