import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
// app
import { ICard } from '../cards/card.model';
import { IDeck } from '../decks/deck.model';
import { CardActions } from '../cards/ngrx/card.action';
import { DeckActions } from '../decks/ngrx/deck.action';
import { IAppState } from '../ngrx/app.action';

@Component({
  templateUrl: './viewer.component.html',
  styleUrls: [ './viewer.component.scss' ]
})
export class ViewerComponent implements OnInit {
  cardList$: Observable<ICard[]>;
  deck$: Observable<IDeck>;

  constructor(private route: ActivatedRoute,
              private store: Store<IAppState>) {}

  ngOnInit() {
    this.deck$ = this.route.params
      .switchMap(params => {
        this.store.dispatch(new DeckActions.LoadDeckAction(params['deckUid']));
        this.store.dispatch(new CardActions.LoadCardListAction(params['deckUid']));
        return this.store.select(s => s.deck.current);
      });

    this.cardList$ = this.store.select(s => s.card.list);
  }
}
