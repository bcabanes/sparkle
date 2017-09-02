import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivate, CanLoad, Route,
  RouterStateSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/take';
// app
import { IAppState } from '../ngrx/app.action';
import { UserState } from './ngrx/user.state';

@Injectable()
export class UserGuard implements CanActivate, CanLoad {

  constructor(private store: Store<IAppState>) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              routerState: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.store.select(s => s.user)
        .take(1)
        .subscribe((state: UserState.IState) => {
          if (state.current) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  }

  canLoad(route: Route): Promise<boolean> {
    return this.canActivate(null, null);
  }
}
