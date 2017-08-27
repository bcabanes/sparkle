import { ActionReducerMap } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { IAppState } from './app.action';

export const appReducer: ActionReducerMap<IAppState> = {
  router: routerReducer
};
