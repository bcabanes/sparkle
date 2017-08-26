import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './layouts';

const routes: Routes = [
  {
    path: 'auth',
    component: BlankLayoutComponent,
    loadChildren: 'app/authentication/authentication.module#AuthenticationModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule {
}
