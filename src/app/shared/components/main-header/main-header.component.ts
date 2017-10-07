import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../ngrx/app.action';
import { Observable } from 'rxjs/Observable';
// app
import { IUser } from '../../../user/user.model';
import { UserActions } from '../../../user/ngrx/user.action';
import { IDeck } from '../../../decks/deck.model';
import { DeckService } from '../../../decks/deck.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: [ './main-header.component.scss' ]
})
export class MainHeaderComponent {
  answerableDeckList$: Observable<IDeck[]>;
  currentUser$: Observable<IUser>;

  constructor(private deckService: DeckService,
              public router: Router,
              private store: Store<IAppState>) {
    this.currentUser$ = this.store.select(s => s.user.current);
    this.answerableDeckList$ = this.store.select(s => s.deck.list)
      .map(deckList => deckList.filter(deck => this.deckService.isDeckAnswerable(deck)));
  }

  public signOut() {
    this.store.dispatch(new UserActions.SignOutAction());
  }
}
