import { ICard } from '../card.model';

export namespace CardState {
  export interface IState {
    current?: ICard;
    list?: ICard[];
    errors?: Array<any>;
  }

  export const initialState: IState = {
    current: null,
    list: [],
    errors: []
  };
}
