import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../ngrx/app.action';
import { DeckActions } from '../../../decks/ngrx/deck.action';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Deck, IDeck } from '../../../decks/deck.model';

@Component({
  selector: 'app-deck-edit',
  templateUrl: './deck-edit.component.html'
})
export class DeckEditComponent implements OnInit {
  deck$: Observable<IDeck>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<IAppState>) {
  }

  ngOnInit() {
    this.deck$ = this.route.params
      .switchMap(params => {
        if (params['deckUid']) {
          this.store.dispatch(new DeckActions.LoadDeckAction(params['deckUid']));
          return this.store.select(s => s.deck.current);
        }
        return Observable.of({});
      });
  }

  public saveDeck(deck: Deck) {
    if (deck.uid) {
      console.log('UPDATE DECK ACTION');
      return;
      // this.store.dispatch(new DeckActions.UpdateDeckAction(deck));
      // return this.router.navigate([ '/decks', deck.uid ]);
    }
    this.store.dispatch(new DeckActions.CreateDeckAction(deck.serialize()));
    return this.router.navigate([ '/dashboard' ]);
  }
}
