import { NgModule } from '@angular/core';
// app
import { PROFILE_COMPONENTS } from './components';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UserModule } from '../user/user.module';

@NgModule({
  declarations: [
    ...PROFILE_COMPONENTS,
  ],
  imports: [
    ProfileRoutingModule,
    SharedModule,
    UserModule
  ]
})
export class ProfileModule {
}
