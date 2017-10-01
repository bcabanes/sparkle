import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
// app
import { IAppState } from '../../ngrx/app.action';
import { IUser, User } from '../../user/user.model';
import { UserActions } from '../../user/ngrx/user.action';

@Component({
  selector: 'app-profile-edit',
  template: `
    <div class="profile-edit-container">
      <app-user-form [user]="user$ | async" (submitted)="saveUser($event)"></app-user-form>
    </div>
    <!-- /.profile-edit-container -->
  `,
  styleUrls: [ './profile-edit.components.scss' ]
})
export class ProfileEditComponent implements OnInit {
  public user$: Observable<IUser>;

  constructor(private store: Store<IAppState>) {
  }

  ngOnInit() {
    this.user$ = this.store.select(s => s.user.current);
  }

  public saveUser(user: User) {
    if (!user.uid) {
      return;
    }
    return this.store.dispatch(new UserActions.UpdateAction(user));
  }
}
