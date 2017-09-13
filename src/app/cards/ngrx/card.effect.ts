import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
// app
import { CardService } from '../card.service';
import { CardActions } from './card.action';
import { Card, ICard } from '../card.model';

@Injectable()
export class CardEffects {

  @Effect() createCard$: Observable<Action> = this.actions$
    .ofType(CardActions.ActionTypes.CREATE_CARD)
    .switchMap((action: CardActions.CreateCardAction) =>
      this.cardService.createCard(action.payload))
        .map((data: ICard) => new CardActions.CreateCardSuccessAction(data))
        .catch(error => Observable.of(new CardActions.CreateCardFailureAction(error)));

  @Effect() createCardSuccess$: Observable<Action> = this.actions$
    .ofType(CardActions.ActionTypes.CREATE_CARD_SUCCESS)
    .map((action: CardActions.CreateCardSuccessAction) => {
      const card = new Card(action.payload);
      return new CardActions.ChangedAction({ current: card.serialize(), errors: [] });
    })
    .withLatestFrom(this.store)
    .map(([action, state]) => new CardActions.LoadCardListAction(state.deck.current.uid));

  @Effect() deleteCard$: Observable<Action> = this.actions$
    .ofType(CardActions.ActionTypes.DELETE_CARD)
    .switchMap((action: CardActions.DeleteCardAction) =>
      this.cardService.deleteCard(action.payload))
        .map(data => new CardActions.DeleteCardSuccessAction())
        .catch(error => Observable.of(new CardActions.DeleteCardFailureAction(error)));

  @Effect() deleteCardSuccess$: Observable<Action> = this.actions$
    .ofType<CardActions.DeleteCardSuccessAction>(CardActions.ActionTypes.DELETE_CARD_SUCCESS)
    .withLatestFrom(this.store)
    .map(([ action, state ]) => new CardActions.LoadCardListAction(state.deck.current.uid));

  @Effect() loadCard$: Observable<Action> = this.actions$
    .ofType(CardActions.ActionTypes.LOAD_CARD)
    .switchMap((action: CardActions.LoadCardAction) => {
      return this.cardService.getCard(action.payload)
        .map((card: ICard) => new CardActions.LoadCardSuccessAction(card))
        .catch(error => Observable.of(new CardActions.LoadCardFailureAction(error)));
    });

  @Effect() loadCardSuccess$: Observable<Action> = this.actions$
    .ofType(CardActions.ActionTypes.LOAD_CARD_SUCCESS)
    .map((action: CardActions.LoadCardSuccessAction) => {
      const card = new Card(action.payload);
      return new CardActions.ChangedAction({ current: card.serialize(), errors: [] });
    });

  @Effect() loadCardList$: Observable<Action> = this.actions$
    .ofType(CardActions.ActionTypes.LOAD_CARD_LIST)
    .switchMap((action: CardActions.LoadCardListAction) => {
      return this.cardService.getCardList(action.payload)
        .map((cardList: ICard[]) => new CardActions.LoadCardListSuccessAction(cardList))
        .catch(error => Observable.of(new CardActions.LoadCardListFailureAction(error)));
    });

  @Effect() loadCardListSuccess$: Observable<Action> = this.actions$
    .ofType(CardActions.ActionTypes.LOAD_CARD_LIST_SUCCESS)
    .map((action: CardActions.LoadCardListSuccessAction) => {
      const cardList: ICard[] = action.payload.map((firebaseCard: any) => {
        const card = new Card({ ...firebaseCard, uid: firebaseCard.$key });
        return card.serialize();
      });
      return new CardActions.ChangedAction({ list: cardList, errors: [] });
    });

  @Effect() updateCard$: Observable<Action> = this.actions$
    .ofType(CardActions.ActionTypes.UPDATE_CARD)
    .switchMap((action: CardActions.UpdateCardAction) => {
      return this.cardService.updateCard(action.payload)
        .map(() => new CardActions.UpdateCardSuccessAction(action.payload))
        .catch(error => Observable.of(new CardActions.LoadCardListFailureAction(error)));
    });

  @Effect() updateCardSuccess$: Observable<Action> = this.actions$
    .ofType(CardActions.ActionTypes.UPDATE_CARD_SUCCESS)
    .map((action: CardActions.UpdateCardSuccessAction) => {
      const card = new Card(action.payload);
      return new CardActions.ChangedAction({ current: card.serialize(), errors: [] });
    });

  @Effect() apiError$: Observable<Action> = this.actions$
    .ofType<
      CardActions.ApiErrorAction |
      CardActions.CreateCardFailureAction |
      CardActions.LoadCardFailureAction |
      CardActions.LoadCardListFailureAction |
      CardActions.UpdateCardFailureAction>(
      CardActions.ActionTypes.API_ERROR,
      CardActions.ActionTypes.CREATE_CARD_FAILURE,
      CardActions.ActionTypes.LOAD_CARD_FAILURE,
      CardActions.ActionTypes.LOAD_CARD_LIST_FAILURE,
      CardActions.ActionTypes.UPDATE_CARD_FAILURE
    )
    .withLatestFrom(this.store)
    .map(([ action, state ]) => new CardActions.ChangedAction({
      errors: [ action.payload, ...(state.errors || []) ]
    }));


  constructor(private actions$: Actions,
              private cardService: CardService,
              private store: Store<any>) {}
}
