import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import {
  AuthenticationComponent,
  SignInComponent,
  SignUpComponent
} from './components';

const routes: Routes = [
  {
    path: '',
    component: AuthenticationComponent,
    children: [
      { path: 'sign-in', component: SignInComponent },
      { path: 'sign-up', component: SignUpComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthenticationRoutingModule {
}
