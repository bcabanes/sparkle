import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute} from '@angular/router';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/find';
import 'rxjs/add/operator/switchMap';
// app
import { IAppState } from '../../../ngrx/app.action';
import { ICard } from '../../../cards/card.model';
import { CardActions } from '../../../cards/ngrx/card.action';

@Component({
  selector: 'app-card-details',
  templateUrl: 'card-details.component.html'
})
export class CardDetailsComponent implements OnInit {
  card$: Observable<ICard>;

  constructor(private route: ActivatedRoute,
              private store: Store<IAppState>) {
  }

  ngOnInit() {
    this.card$ = this.route.params
      .switchMap(params => {
        this.store.dispatch(new CardActions.LoadCardAction(params['cardUid']));
        return this.store.select(s => s.card.current);
      });
  }

  public deleteCard(cardUid: string) {
    this.store.dispatch(new CardActions.DeleteCardAction(cardUid));
  }
}
