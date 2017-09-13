import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/of';
// app
import { IAppState } from '../../../ngrx/app.action';
import { CardActions } from '../../../cards/ngrx/card.action';
import { Card, ICard } from '../../../cards/card.model';

@Component({
  selector: 'app-card-edit',
  templateUrl: './card-edit.component.html'
})
export class CardEditComponent implements OnInit, OnDestroy {
  public card$: Observable<ICard>;
  public deckUid: string;
  private subscription: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<IAppState>) {
  }

  ngOnInit() {
    this.card$ = this.route.params
      .switchMap(params => {
        if (params['cardUid']) {
          this.store.dispatch(new CardActions.LoadCardAction(params['cardUid']));
          return this.store.select(s => s.card.current);
        }
        return Observable.of({});
      });
    this.subscription = this.store.select(s => s.deck.current)
      .subscribe(deck => this.deckUid = deck.uid);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public saveCard(card: Card) {
    if (card.uid) {
      return this.store.dispatch(
        new CardActions.UpdateCardAction(card));
    }
    const cardRaw: ICard = { ...card.serialize(), deckUid: this.deckUid } as ICard;
    this.store.dispatch(new CardActions.CreateCardAction(cardRaw));
    return this.router.navigate([ '/manage', 'decks', this.deckUid ]);
  }
}
