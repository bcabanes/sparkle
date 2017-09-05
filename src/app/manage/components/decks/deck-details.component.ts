import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute} from '@angular/router';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/switchMap';
// app
import { IAppState } from '../../../ngrx/app.action';
import { IDeck } from '../../../decks/deck.model';

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
      .switchMap(params => this.store.select(s => s.deck.list)
        .map((deckList: IDeck[]) =>
          deckList.find((deck) => deck.uid === params['deckUid'])));
  }
}
