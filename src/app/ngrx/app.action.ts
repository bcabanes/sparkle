import { Action } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';
// app
import { RouterStateUrl, type } from '../shared';
import { UserState } from '../user/ngrx';
import { DeckState } from '../decks/ngrx/deck.state';
import { CardState } from '../cards/ngrx/card.state';

export interface IAppState {
  deck: DeckState.IState;
  card: CardState.IState;
  router: RouterReducerState<RouterStateUrl>;
  user: UserState.IState;
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
