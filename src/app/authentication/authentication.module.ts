import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AUTH_COMPONENTS } from './components';
import { AuthenticationRoutingModule } from './authentication-routing.module';


@NgModule({
  declarations: [
    ...AUTH_COMPONENTS
  ],
  imports: [
    AuthenticationRoutingModule,
    SharedModule
  ]
})
export class AuthenticationModule {
}
