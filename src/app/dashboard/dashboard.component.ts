import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
// app
import { IAppState } from '../ngrx/app.action';
import { IDeck } from '../decks/deck.model';
import { DeckActions } from '../decks/ngrx/deck.action';

@Component({
  selector   : 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls  : [ './dashboard.component.scss' ]
})
export class DashboardComponent implements OnInit {
  deckList$: Observable<IDeck[]>;
  activatedDeckList$: Observable<IDeck[]>;

  constructor(private store: Store<IAppState>) {}

  ngOnInit() {
    this.store.dispatch(new DeckActions.LoadDeckListAction());
    this.deckList$ = this.store.select(s => s.deck.list);
    this.activatedDeckList$ = this.deckList$.map(deckList => deckList.filter(deck => deck.isActive));
  }

  public deleteDeck(deckUid) {
    this.store.dispatch(new DeckActions.DeleteDeckAction(deckUid));
  }
}
