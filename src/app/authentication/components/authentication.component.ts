import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
// app
import { IAppState } from '../../ngrx/app.action';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: [ './authentication.scss' ]
})
export class AuthenticationComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  constructor(private router: Router,
              private store: Store<IAppState>) {
  }

  ngOnInit() {
    this.subscription = this.store.select(s => s.user.current)
      .subscribe(currentUser => {
        if (currentUser) {
          this.router.navigate([ '/dashboard' ]);
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
