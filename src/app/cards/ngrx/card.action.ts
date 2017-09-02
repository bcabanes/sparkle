import { Action } from '@ngrx/store';
import { type } from '../../shared/helpers/type';
// app
import { CardState } from './card.state';
import { ICard } from '../card.model';

export namespace CardActions {
  const CATEGORY = 'Card';

  export interface ICardAction {
    API_ERROR: string;
    CHANGED: string;
    CREATE_CARD: string;
    CREATE_CARD_FAILURE: string;
    CREATE_CARD_SUCCESS: string;
    DELETE_CARD: string;
    DELETE_CARD_FAILURE: string;
    DELETE_CARD_SUCCESS: string;
    INIT: string;
    LOAD_CARD: string;
    LOAD_CARD_FAILURE: string;
    LOAD_CARD_SUCCESS: string;
    LOAD_CARD_LIST: string;
    LOAD_CARD_LIST_FAILURE: string;
    LOAD_CARD_LIST_SUCCESS: string;
  }

  export const ActionTypes: ICardAction = {
    API_ERROR             : type(`${CATEGORY} Api Error`),
    CHANGED               : type(`${CATEGORY} Changed`),
    CREATE_CARD           : type(`${CATEGORY} Create card`),
    CREATE_CARD_FAILURE   : type(`${CATEGORY} Create card Failure`),
    CREATE_CARD_SUCCESS   : type(`${CATEGORY} Create card Success`),
    DELETE_CARD           : type(`${CATEGORY} Delete card`),
    DELETE_CARD_FAILURE   : type(`${CATEGORY} Delete card Failure`),
    DELETE_CARD_SUCCESS   : type(`${CATEGORY} Delete card Success`),
    INIT                  : type(`${CATEGORY} Initialization`),
    LOAD_CARD             : type(`${CATEGORY} Load card`),
    LOAD_CARD_FAILURE     : type(`${CATEGORY} Load card Failure`),
    LOAD_CARD_SUCCESS     : type(`${CATEGORY} Load card Success`),
    LOAD_CARD_LIST        : type(`${CATEGORY} Load card list`),
    LOAD_CARD_LIST_FAILURE: type(`${CATEGORY} Load card list Failure`),
    LOAD_CARD_LIST_SUCCESS: type(`${CATEGORY} Load card list Success`)
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
     * @param {CardState.IState} payload
     */
    constructor(public payload: CardState.IState) {
    }
  }

  export class InitAction implements Action {
    type = ActionTypes.INIT;
    payload: string = null;
  }

  /**
   * Create a card.
   */
  export class CreateCardAction implements Action {
    type = ActionTypes.CREATE_CARD;

    /**
     *
     * @param {ICard} payload
     */
    constructor(public payload: ICard) {
    }
  }

  export class CreateCardFailureAction implements Action {
    type = ActionTypes.CREATE_CARD_FAILURE;

    /**
     *
     * @param payload
     */
    constructor(public payload: any) {
    }
  }

  export class CreateCardSuccessAction implements Action {
    type = ActionTypes.CREATE_CARD_SUCCESS;

    /**
     *
     * @param {ICard} payload
     */
    constructor(public payload: ICard) {
    }
  }

  /**
   * Delete a card.
   */
  export class DeleteCardAction implements Action {
    type = ActionTypes.DELETE_CARD;

    /**
     *
     * @param {string} payload
     */
    constructor(public payload: string) {
    }
  }

  export class DeleteCardFailureAction implements Action {
    type = ActionTypes.DELETE_CARD_FAILURE;

    /**
     *
     * @param payload
     */
    constructor(public payload: any) {
    }
  }

  export class DeleteCardSuccessAction implements Action {
    type = ActionTypes.DELETE_CARD_SUCCESS;
    payload: string = null;
  }

  /**
   * Load a specific card.
   */
  export class LoadCardAction implements Action {
    type = ActionTypes.LOAD_CARD;

    /**
     *
     * @param {string} payload
     */
    constructor(public payload: string) {
    }
  }

  export class LoadCardFailureAction implements Action {
    type = ActionTypes.LOAD_CARD_FAILURE;

    /**
     *
     * @param payload
     */
    constructor(public payload: any) {
    }
  }

  export class LoadCardSuccessAction implements Action {
    type = ActionTypes.LOAD_CARD_SUCCESS;

    /**
     *
     * @param {ICard} payload
     */
    constructor(public payload: ICard) {
    }
  }

  export class LoadCardListAction implements Action {
    type = ActionTypes.LOAD_CARD_LIST;

    constructor(public payload: string) {
    }
  }

  export class LoadCardListFailureAction implements Action {
    type = ActionTypes.LOAD_CARD_LIST_FAILURE;

    /**
     *
     * @param payload
     */
    constructor(public payload: any) {
    }
  }

  export class LoadCardListSuccessAction implements Action {
    type = ActionTypes.LOAD_CARD_LIST_SUCCESS;

    /**
     *
     * @param {ICard[]} payload
     */
    constructor(public payload: ICard[]) {
    }
  }

  /**
   * Load list of cards.
   */

  export type Actions =
    ApiErrorAction |
    ChangedAction |
    InitAction |
    CreateCardAction |
    CreateCardFailureAction |
    CreateCardSuccessAction |
    LoadCardAction |
    LoadCardFailureAction |
    LoadCardSuccessAction;
}
