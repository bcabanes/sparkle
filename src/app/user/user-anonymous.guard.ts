import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot
} from '@angular/router';
// app
import { UserService } from './user.service';


@Injectable()
export class UserAnonymousGuard implements CanActivate, CanLoad {

  constructor(private userService: UserService) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              routerState: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
        .subscribe(user => {
          if (!user) {
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
