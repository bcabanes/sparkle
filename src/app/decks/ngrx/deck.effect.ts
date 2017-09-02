import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
// app
import { DeckService } from '../deck.service';
import { DeckActions } from './deck.action';
import { Deck, IDeck } from '../deck.model';
import { Action, Store } from '@ngrx/store';

@Injectable()
export class DeckEffects {

  @Effect() createDeck$: Observable<Action> = this.actions$
    .ofType<DeckActions.CreateDeckAction>(DeckActions.ActionTypes.CREATE_DECK)
    .switchMap((action: DeckActions.CreateDeckAction) =>
      Observable.fromPromise(this.deckService.createDeck(action.payload))
        .map(data => new DeckActions.CreateDeckSuccessAction(data))
        .catch(error => Observable.of(new DeckActions.CreateDeckFailureAction(error))));

  @Effect() createDeckSuccess$: Observable<Action> = this.actions$
    .ofType<DeckActions.CreateDeckSuccessAction>(DeckActions.ActionTypes.CREATE_DECK_SUCCESS)
    .map((action: DeckActions.CreateDeckSuccessAction) => {
      const deck = new Deck(action.payload);
      return new DeckActions.ChangedAction({ current: deck.serialize(), errors: [] });
    });

  @Effect() deleteDeck$: Observable<Action> = this.actions$
    .ofType<DeckActions.DeleteDeckAction>(DeckActions.ActionTypes.DELETE_DECK)
    .switchMap((action: DeckActions.DeleteDeckAction) =>
      Observable.fromPromise(this.deckService.deleteDeck(action.payload))
        .map(data => new DeckActions.DeleteDeckSuccessAction(action.payload.userUid))
        .catch(error => Observable.of(new DeckActions.DeleteDeckFailureAction(error))));

  @Effect() deleteDeckSuccess$: Observable<Action> = this.actions$
    .ofType<DeckActions.DeleteDeckSuccessAction>(DeckActions.ActionTypes.DELETE_DECK_SUCCESS)
    .map((action: DeckActions.DeleteDeckSuccessAction) =>
      new DeckActions.LoadDeckListAction(action.payload));

  @Effect() loadDeck$: Observable<Action> = this.actions$
    .ofType<DeckActions.LoadDeckAction>(DeckActions.ActionTypes.LOAD_DECK)
    .switchMap((action: DeckActions.LoadDeckAction) => {
      return this.deckService.getDeck({
        deckUid: action.payload.deckUid,
        userUid: action.payload.userUid
      })
        .map((deck: IDeck) => new DeckActions.LoadDeckSuccessAction(deck))
        .catch(error => Observable.of(new DeckActions.LoadDeckFailureAction(error)));
    });

  @Effect() loadDeckSuccess$: Observable<Action> = this.actions$
    .ofType<DeckActions.LoadDeckSuccessAction>(DeckActions.ActionTypes.LOAD_DECK_SUCCESS)
    .map((action: DeckActions.LoadDeckSuccessAction) => {
      const deck = new Deck(action.payload);
      return new DeckActions.ChangedAction({ current: deck.serialize(), errors: [] });
    });

  @Effect() loadDeckList$: Observable<Action> = this.actions$
    .ofType<DeckActions.LoadDeckListAction>(DeckActions.ActionTypes.LOAD_DECK_LIST)
    .switchMap((action: DeckActions.LoadDeckListAction) => {
      return this.deckService.getDeckList(action.payload)
        .map((deckList: IDeck[]) => new DeckActions.LoadDeckListSuccessAction(deckList))
        .catch(error => Observable.of(new DeckActions.LoadDeckListFailureAction(error)));
    });

  @Effect() loadDeckListSuccess$: Observable<Action> = this.actions$
    .ofType<DeckActions.LoadDeckListSuccessAction>(DeckActions.ActionTypes.LOAD_DECK_LIST_SUCCESS)
    .map((action: DeckActions.LoadDeckListSuccessAction) => {
      const deckList: IDeck[] = action.payload.map((firebaseDeck: any) => {
        const deck = new Deck({ ...firebaseDeck, uid: firebaseDeck.$key });
        return deck.serialize();
      });
      return new DeckActions.ChangedAction({ list: deckList, errors: [] });
    });

  @Effect() apiError$: Observable<Action> = this.actions$
    .ofType<
      DeckActions.ApiErrorAction |
      DeckActions.CreateDeckFailureAction |
      DeckActions.LoadDeckFailureAction |
      DeckActions.LoadDeckListFailureAction>(
      DeckActions.ActionTypes.API_ERROR,
      DeckActions.ActionTypes.CREATE_DECK_FAILURE,
      DeckActions.ActionTypes.LOAD_DECK_FAILURE,
      DeckActions.ActionTypes.LOAD_DECK_LIST_FAILURE
    )
    .withLatestFrom(this.store)
    .map(([ action, state ]) => new DeckActions.ChangedAction({
      errors: [ action.payload, ...(state.errors || []) ]
    }));


  constructor(private actions$: Actions,
              private deckService: DeckService,
              private store: Store<any>) {}
}
