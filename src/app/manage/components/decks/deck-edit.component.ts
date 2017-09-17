import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionsSubject, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/filter';
// app
import { IAppState } from '../../../ngrx/app.action';
import { DeckActions } from '../../../decks/ngrx/deck.action';
import { Deck, IDeck } from '../../../decks/deck.model';
import { ofTypeFilter } from '../../../shared/helpers/action-type-filter';


@Component({
  selector: 'app-deck-edit',
  templateUrl: './deck-edit.component.html'
})
export class DeckEditComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  deck$: Observable<IDeck>;

  constructor(private actionsSubject: ActionsSubject,
              private route: ActivatedRoute,
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public saveDeck(deck: Deck) {
    if (deck.uid) {
      this.store.dispatch(new DeckActions.UpdateDeckAction(deck));
    } else {
      this.store.dispatch(new DeckActions.CreateDeckAction(deck.serialize()));
    }

    this.subscription = this.actionsSubject.filter(
      ofTypeFilter(DeckActions.ActionTypes.CREATE_DECK_SUCCESS,
        DeckActions.ActionTypes.UPDATE_DECK_SUCCESS))
      .subscribe(() => this.router.navigate([ '/dashboard' ]));
  }
}
