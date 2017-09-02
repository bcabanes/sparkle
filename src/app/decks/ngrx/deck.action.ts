import { Action } from '@ngrx/store';
import { type } from '../../shared/helpers/type';
import { DeckState } from './deck.state';
import { IDeck } from '../deck.model';

export namespace DeckActions {
  const CATEGORY = 'Deck';

  export interface IDeckAction {
    API_ERROR: string;
    CHANGED: string;
    CREATE_DECK: string;
    CREATE_DECK_FAILURE: string;
    CREATE_DECK_SUCCESS: string;
    DELETE_DECK: string;
    DELETE_DECK_FAILURE: string;
    DELETE_DECK_SUCCESS: string;
    INIT: string;
    LOAD_DECK: string;
    LOAD_DECK_FAILURE: string;
    LOAD_DECK_SUCCESS: string;
    LOAD_DECK_LIST: string;
    LOAD_DECK_LIST_FAILURE: string;
    LOAD_DECK_LIST_SUCCESS: string;
  }

  export const ActionTypes: IDeckAction = {
    API_ERROR             : type(`${CATEGORY} Api Error`),
    CHANGED               : type(`${CATEGORY} Changed`),
    CREATE_DECK           : type(`${CATEGORY} Create deck`),
    CREATE_DECK_FAILURE   : type(`${CATEGORY} Create deck Failure`),
    CREATE_DECK_SUCCESS   : type(`${CATEGORY} Create deck Success`),
    DELETE_DECK           : type(`${CATEGORY} Delete deck`),
    DELETE_DECK_FAILURE   : type(`${CATEGORY} Delete deck Failure`),
    DELETE_DECK_SUCCESS   : type(`${CATEGORY} Delete deck Success`),
    INIT                  : type(`${CATEGORY} Initialization`),
    LOAD_DECK             : type(`${CATEGORY} Load deck`),
    LOAD_DECK_FAILURE     : type(`${CATEGORY} Load deck Failure`),
    LOAD_DECK_SUCCESS     : type(`${CATEGORY} Load deck Success`),
    LOAD_DECK_LIST        : type(`${CATEGORY} Load deck list`),
    LOAD_DECK_LIST_FAILURE: type(`${CATEGORY} Load deck list Failure`),
    LOAD_DECK_LIST_SUCCESS: type(`${CATEGORY} Load deck list Success`)
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
     * @param {DeckState.IState} payload
     */
    constructor(public payload: DeckState.IState) {
    }
  }

  export class InitAction implements Action {
    type = ActionTypes.INIT;
    payload: string = null;
  }

  /**
   * Create a deck.
   */
  export class CreateDeckAction implements Action {
    type = ActionTypes.CREATE_DECK;

    /**
     *
     * @param {DeckState.IState} payload
     */
    constructor(public payload: { deck: IDeck, userUid: string }) {
    }
  }

  export class CreateDeckFailureAction implements Action {
    type = ActionTypes.CREATE_DECK_FAILURE;

    /**
     *
     * @param payload
     */
    constructor(public payload: any) {
    }
  }

  export class CreateDeckSuccessAction implements Action {
    type = ActionTypes.CREATE_DECK_SUCCESS;

    /**
     *
     * @param payload
     */
    constructor(public payload: any) {
    }
  }

  /**
   * Delete a deck.
   */
  export class DeleteDeckAction implements Action {
    type = ActionTypes.DELETE_DECK;

    /**
     *
     * @param {{deckUid: string; userUid: string}} payload
     */
    constructor(public payload: { deckUid: string, userUid: string }) {
    }
  }

  export class DeleteDeckFailureAction implements Action {
    type = ActionTypes.DELETE_DECK_FAILURE;

    /**
     *
     * @param payload
     */
    constructor(public payload: any) {
    }
  }

  export class DeleteDeckSuccessAction implements Action {
    type = ActionTypes.DELETE_DECK_SUCCESS;

    /**
     *
     * @param {string} payload
     */
    constructor(public payload: string ) {
    }
  }

  /**
   * Load a specific deck.
   */
  export class LoadDeckAction implements Action {
    type = ActionTypes.LOAD_DECK;

    /**
     *
     * @param {{deckUid: string; userUid: string}} payload
     */
    constructor(public payload: { deckUid: string, userUid: string }) {
    }
  }

  export class LoadDeckFailureAction implements Action {
    type = ActionTypes.LOAD_DECK_FAILURE;

    /**
     *
     * @param payload
     */
    constructor(public payload: any) {
    }
  }

  export class LoadDeckSuccessAction implements Action {
    type = ActionTypes.LOAD_DECK_SUCCESS;

    /**
     *
     * @param {IDeck} payload
     */
    constructor(public payload: IDeck) {
    }
  }

  export class LoadDeckListAction implements Action {
    type = ActionTypes.LOAD_DECK_LIST;

    /**
     *
     * @param {string} payload
     */
    constructor(public payload: string ) {
    }
  }

  export class LoadDeckListFailureAction implements Action {
    type = ActionTypes.LOAD_DECK_LIST_FAILURE;

    /**
     *
     * @param payload
     */
    constructor(public payload: any) {
    }
  }

  export class LoadDeckListSuccessAction implements Action {
    type = ActionTypes.LOAD_DECK_LIST_SUCCESS;

    /**
     *
     * @param {IDeck[]} payload
     */
    constructor(public payload: IDeck[]) {
    }
  }

  /**
   * Load list of decks.
   */

  export type Actions =
    ApiErrorAction |
    ChangedAction |
    InitAction |
    CreateDeckAction |
    CreateDeckFailureAction |
    CreateDeckSuccessAction |
    LoadDeckAction |
    LoadDeckFailureAction |
    LoadDeckSuccessAction;
}
