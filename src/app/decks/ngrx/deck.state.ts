import { IDeck } from '../deck.model';

export namespace DeckState {
  export interface IState {
    current?: IDeck;
    list?: IDeck[];
    errors?: Array<any>;
  }

  export const initialState: IState = {
    current: null,
    list: [],
    errors: []
  };
}
