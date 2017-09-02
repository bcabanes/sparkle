import { CardState } from './card.state';
import { CardActions } from './card.action';

export function cardReducer(state: CardState.IState = CardState.initialState,
                            action: CardActions.Actions): CardState.IState {
  const changeState = (customPayload?: any) =>
    Object.assign({}, state, customPayload || action.payload);

  switch (action.type) {
    case CardActions.ActionTypes.CHANGED:
      return changeState();
    default:
      return state;
  }
}
