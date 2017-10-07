import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute} from '@angular/router';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/find';
import 'rxjs/add/operator/switchMap';
// app
import { IAppState } from '../../../ngrx/app.action';
import { IDeck } from '../../../decks/deck.model';
import { DeckActions } from '../../../decks/ngrx/deck.action';
import { CardActions } from '../../../cards/ngrx/card.action';
import { Card, ICard } from '../../../cards/card.model';

@Component({
  selector: 'app-deck-details',
  templateUrl: 'deck-details.component.html',
  styleUrls: [ './deck-details.component.scss' ]
})
export class DeckDetailsComponent implements OnInit {
  deck$: Observable<IDeck>;
  cardList$: Observable<ICard[]>;

  constructor(private route: ActivatedRoute,
              private store: Store<IAppState>) {
  }

  ngOnInit() {
    this.deck$ = this.route.params
      .switchMap(params => {
        this.store.dispatch(new DeckActions.LoadDeckAction(params['deckUid']));
        this.store.dispatch(new CardActions.LoadCardListAction(params['deckUid']));
        return this.store.select(s => s.deck.current);
      });

    this.cardList$ = this.store.select(s => s.card.list);
  }

  public deleteDeck(deckUid: string) {
    this.store.dispatch(new DeckActions.DeleteDeckAction(deckUid));
  }

  public deleteCard(cardUid: string) {
    this.store.dispatch(new CardActions.DeleteCardAction(cardUid));
  }
}
