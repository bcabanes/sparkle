import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// app
import { userReducer } from './ngrx/user.reducer';
import { UserEffects } from './ngrx/user.effect';
import { UserService } from './user.service';
import { UserAuthenticatedGuard } from './user-authenticated.guard';
import { UserAnonymousGuard } from './user-anonymous.guard';
import { USER_COMPONENTS } from './components/index';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ...USER_COMPONENTS
  ],
  imports: [
    SharedModule,
    StoreModule.forFeature('user', userReducer),
    EffectsModule.forFeature([UserEffects])
  ],
  providers: [
    UserAuthenticatedGuard,
    UserAnonymousGuard,
    UserService
  ],
  exports: [
    ...USER_COMPONENTS
  ]
})
export class UserModule {
}
