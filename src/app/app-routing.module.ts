import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent, CommonLayoutComponent } from './layouts';

const routes: Routes = [
  {
    path: 'auth',
    component: BlankLayoutComponent,
    loadChildren: 'app/authentication/authentication.module#AuthenticationModule'
  },
  {
    path: 'dashboard',
    component: CommonLayoutComponent,
    loadChildren: 'app/dashboard/dashboard.module#DashboardModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule {
}
