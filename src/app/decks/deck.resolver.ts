import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
// app
import { IAppState } from '../ngrx/app.action';
import { Observable } from 'rxjs/Observable';
import { IDeck } from './deck.model';
import { DeckActions } from './ngrx/deck.action';

@Injectable()
export class DeckResolver implements Resolve<any> {
  done$: Subject<boolean>;

  constructor(private store: Store<IAppState>) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<IDeck> {
    this.done$ = new Subject();
    this.store.dispatch(new DeckActions.LoadDeckAction(route.params['deckUid']));
    return Observable.create(observer => {
      this.store.select(s => s.deck.current)
        .takeUntil(this.done$)
        .subscribe(deck => {
          if (deck && deck.uid === route.paramMap['deckUid']) {
            this.done$.next(true);
            this.done$.complete();
            observer.next(deck);
            observer.complete();
          }
        });
    });
  }
}
