import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
// app
import { DeckService } from '../deck.service';
import { DeckActions } from './deck.action';
import { Deck, IDeck } from '../deck.model';
import { IAppState } from '../../ngrx/app.action';

@Injectable()
export class DeckEffects {

  @Effect() createDeck$: Observable<Action> = this.actions$
    .ofType(DeckActions.ActionTypes.CREATE_DECK)
    .mergeMap((action: DeckActions.CreateDeckAction) =>
      this.deckService.createDeck(action.payload))
        .map(data => new DeckActions.CreateDeckSuccessAction(data))
        .catch(error => Observable.of(new DeckActions.CreateDeckFailureAction(error)));

  @Effect() createDeckSuccess$: Observable<Action> = this.actions$
    .ofType(DeckActions.ActionTypes.CREATE_DECK_SUCCESS)
    .map((action: DeckActions.CreateDeckSuccessAction) => {
      const deck = new Deck(action.payload);
      return new DeckActions.ChangedAction({ current: deck.serialize(), errors: [] });
    });

  @Effect() deleteDeck$: Observable<Action> = this.actions$
    .ofType(DeckActions.ActionTypes.DELETE_DECK)
    .mergeMap((action: DeckActions.DeleteDeckAction) =>
      this.deckService.deleteDeck(action.payload))
        .map(data => new DeckActions.DeleteDeckSuccessAction())
        .catch(error => Observable.of(new DeckActions.DeleteDeckFailureAction(error)));

  @Effect() deleteDeckSuccess$: Observable<Action> = this.actions$
    .ofType(DeckActions.ActionTypes.DELETE_DECK_SUCCESS)
    .map((action: DeckActions.DeleteDeckSuccessAction) =>
      new DeckActions.LoadDeckListAction());

  @Effect() loadDeck$: Observable<Action> = this.actions$
    .ofType(DeckActions.ActionTypes.LOAD_DECK)
    .switchMap((action: DeckActions.LoadDeckAction) => {
      return this.deckService.getDeck(action.payload)
        .map((deck: IDeck) => new DeckActions.LoadDeckSuccessAction(deck))
        .catch(error => Observable.of(new DeckActions.LoadDeckFailureAction(error)));
    });

  @Effect() loadDeckSuccess$: Observable<Action> = this.actions$
    .ofType(DeckActions.ActionTypes.LOAD_DECK_SUCCESS)
    .map((action: DeckActions.LoadDeckSuccessAction) => {
      const deck = new Deck(action.payload);
      return new DeckActions.ChangedAction({ current: deck.serialize(), errors: [] });
    });

  @Effect() loadDeckList$: Observable<Action> = this.actions$
    .ofType(DeckActions.ActionTypes.LOAD_DECK_LIST)
    .switchMap((action: DeckActions.LoadDeckListAction) => {
      return this.deckService.getDeckList()
        .map((deckList: IDeck[]) => new DeckActions.LoadDeckListSuccessAction(deckList))
        .catch(error => Observable.of(new DeckActions.LoadDeckListFailureAction(error)));
    });

  @Effect() loadDeckListSuccess$: Observable<Action> = this.actions$
    .ofType(DeckActions.ActionTypes.LOAD_DECK_LIST_SUCCESS)
    .map((action: DeckActions.LoadDeckListSuccessAction) => {
      const deckList: IDeck[] = action.payload.map((firebaseDeck: any) => {
        const card = new Deck({ ...firebaseDeck, uid: firebaseDeck.$key });
        return card.serialize();
      });
      return new DeckActions.ChangedAction({ list: deckList, errors: [] });
    });

  @Effect() updateDeck$: Observable<Action> = this.actions$
    .ofType(DeckActions.ActionTypes.UPDATE_DECK)
    .mergeMap((action: DeckActions.UpdateDeckAction) => {
      return this.deckService.updateDeck(action.payload)
        .map(() => new DeckActions.UpdateDeckSuccessAction(action.payload))
        .catch(error => Observable.of(new DeckActions.LoadDeckListFailureAction(error)));
    });

  @Effect() updateDeckSuccess$: Observable<Action> = this.actions$
    .ofType(DeckActions.ActionTypes.UPDATE_DECK_SUCCESS)
    .map((action: DeckActions.UpdateDeckSuccessAction) => {
      const deck = new Deck(action.payload);
      return new DeckActions.ChangedAction({ current: deck.serialize(), errors: [] });
    });

  @Effect() apiError$: Observable<Action> = this.actions$
    .ofType(DeckActions.ActionTypes.API_ERROR,
      DeckActions.ActionTypes.CREATE_DECK_FAILURE,
      DeckActions.ActionTypes.LOAD_DECK_FAILURE,
      DeckActions.ActionTypes.LOAD_DECK_LIST_FAILURE,
      DeckActions.ActionTypes.UPDATE_DECK_FAILURE)
    .withLatestFrom(this.store)
    .map(([ action, state ]: [ DeckActions.Actions, IAppState ]) =>
      new DeckActions.ChangedAction({ errors: [ action.payload, ...(state.deck.errors || []) ] }));


  constructor(private actions$: Actions,
              private deckService: DeckService,
              private store: Store<IAppState>) {}
}
