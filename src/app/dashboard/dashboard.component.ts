import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
// app
import { IAppState } from '../ngrx/app.action';
import { Deck, IDeck } from '../decks/deck.model';
import { DeckActions } from '../decks/ngrx/deck.action';

@Component({
  selector   : 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls  : [ './dashboard.component.scss' ]
})
export class DashboardComponent implements OnInit {
  deckList$: Observable<IDeck[]>;

  constructor(private store: Store<IAppState>) {}

  ngOnInit() {
    this.store.dispatch(new DeckActions.LoadDeckListAction('oEidve0LWFOIVSm6q7BH7gkH4Lo1'));
    this.deckList$ = this.store.select(s => s.deck.list);
  }

  public createDeck() {
    const deck = new Deck({
      title: 'DeckTitle',
      content: `Deck content ${(Math.random() * 100).toFixed()}`,
      type: 'card'
    });
    this.store.dispatch(new DeckActions.CreateDeckAction({
      deck: deck.serialize(),
      userUid: 'oEidve0LWFOIVSm6q7BH7gkH4Lo1'
    }));
  }

  public deleteDeck(deckUid) {
    this.store.dispatch(new DeckActions.DeleteDeckAction({
      deckUid,
      userUid: 'oEidve0LWFOIVSm6q7BH7gkH4Lo1'
    }));
  }
}
