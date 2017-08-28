import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
// app
import { IAppState } from './app.action';
import { environment } from '../../environments/environment';

export const appReducer: ActionReducerMap<IAppState> = {
  router: routerReducer
};

/**
 * Console log all actions while in development mode.
 */
export function logger(reducer: ActionReducer<IAppState>): ActionReducer<IAppState> {
  return (state: IAppState, action: any) => {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

/**
 * By default, `@ngrx/store` uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducer, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<IAppState>[] = !environment.production
  ? [ logger ]
  : [];
