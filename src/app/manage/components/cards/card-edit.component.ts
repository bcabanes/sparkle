import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../ngrx/app.action';
import { CardActions } from '../../../cards/ngrx/card.action';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Card, ICard } from '../../../cards/card.model';

@Component({
  selector: 'app-card-edit',
  templateUrl: './card-edit.component.html'
})
export class CardEditComponent implements OnInit {
  card$: Observable<ICard>;

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
  }

  public saveCard(card: Card) {
    if (card.uid) {
      return this.store.dispatch(new CardActions.UpdateCardAction(card));
    }
    this.store.dispatch(new CardActions.CreateCardAction(card.serialize()));
    return this.router.navigate([ '/dashboard' ]);
  }
}
