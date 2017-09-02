import { DeckState } from './deck.state';
import { DeckActions } from './deck.action';

export function deckReducer(state: DeckState.IState = DeckState.initialState,
                            action: DeckActions.Actions): DeckState.IState {
  const changeState = (customPayload?: any) =>
    Object.assign({}, state, customPayload || action.payload);

  switch (action.type) {
    case DeckActions.ActionTypes.CHANGED:
      return changeState();
    default:
      return state;
  }
}
