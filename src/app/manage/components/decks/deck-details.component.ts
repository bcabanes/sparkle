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

@Component({
  selector: 'app-deck-details',
  templateUrl: 'deck-details.component.html'
})
export class DeckDetailsComponent implements OnInit {
  deck$: Observable<IDeck>;

  constructor(private route: ActivatedRoute,
              private store: Store<IAppState>) {
  }

  ngOnInit() {
    this.deck$ = this.route.params
      .switchMap(params => {
        this.store.dispatch(new DeckActions.LoadDeckAction(params['deckUid']));
        return this.store.select(s => s.deck.current);
      });
  }

  public delete(uid) {
    this.store.dispatch(new DeckActions.DeleteDeckAction(uid));
  }
}
