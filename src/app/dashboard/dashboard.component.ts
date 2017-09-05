import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
// app
import { IAppState } from '../ngrx/app.action';
import { Card, ICard } from '../cards/card.model';
import { Deck, IDeck } from '../decks/deck.model';
import { DeckActions } from '../decks/ngrx/deck.action';
import { CardActions } from '../cards/ngrx/card.action';

@Component({
  selector   : 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls  : [ './dashboard.component.scss' ]
})
export class DashboardComponent implements OnInit {
  deckList$: Observable<IDeck[]>;
  cardList$: Observable<ICard[]>;

  constructor(private store: Store<IAppState>) {}

  ngOnInit() {
    this.store.dispatch(new DeckActions.LoadDeckListAction());
    this.store.dispatch(new CardActions.LoadCardListAction('-Kt-NpzonfXTwtMDogim'));
    this.cardList$ = this.store.select(s => s.card.list);
    this.deckList$ = this.store.select(s => s.deck.list);
  }

  public createCard() {
    const card = new Card({
      title: 'CardTitle',
      content: `Card content ${(Math.random() * 100).toFixed()}`,
      type: 'card',
      deckUid: '-Kt-NpzonfXTwtMDogim'
    });
    this.store.dispatch(new CardActions.CreateCardAction(card.serialize()));
  }

  public createDeck() {
    const deck = new Deck({
      title: `DeckTitle ${(Math.random() * 100).toFixed()}`,
      content: `Deck content ${(Math.random() * 100).toFixed()}`,
      type: 'card'
    });
    this.store.dispatch(new DeckActions.CreateDeckAction(deck.serialize()));
  }

  public deleteCard(cardUid) {
    this.store.dispatch(new CardActions.DeleteCardAction(cardUid));
  }

  public deleteDeck(deckUid) {
    this.store.dispatch(new DeckActions.DeleteDeckAction(deckUid));
  }
}
