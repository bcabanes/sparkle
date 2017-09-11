import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// app
import { userReducer } from './ngrx/user.reducer';
import { UserEffects } from './ngrx/user.effect';
import { UserService } from './user.service';
import { UserAuthenticatedGuard } from './user-authenticated.guard';

@NgModule({
  imports: [
    StoreModule.forFeature('user', userReducer),
    EffectsModule.forFeature([UserEffects])
  ],
  providers: [
    UserAuthenticatedGuard,
    UserService
  ]
})
export class UserModule {
}
