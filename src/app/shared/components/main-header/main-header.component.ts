import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../ngrx/app.action';
import { Observable } from 'rxjs/Observable';
// app
import { IUser } from '../../../user/user.model';
import { UserActions } from '../../../user/ngrx/user.action';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: [ './main-header.component.scss' ]
})
export class MainHeaderComponent {
  currentUser$: Observable<IUser>;

  constructor(public router: Router, private store: Store<IAppState>) {
    this.currentUser$ = this.store.select(s => s.user);
  }

  public signOut() {
    this.store.dispatch(new UserActions.SignOutAction());
  }
}
