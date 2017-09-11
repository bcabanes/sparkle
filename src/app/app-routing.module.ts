import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// app
import { BlankLayoutComponent, CommonLayoutComponent } from './layouts';
import { UserAuthenticatedGuard } from './user/user-authenticated.guard';
import { UserAnonymousGuard } from './user/user-anonymous.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'auth' },
  {
    path: 'auth',
    // canActivate: [ UserAnonymousGuard ],
    component: BlankLayoutComponent,
    loadChildren: 'app/authentication/authentication.module#AuthenticationModule'
  },
  {
    path: 'dashboard',
    canActivate: [ UserAuthenticatedGuard ],
    component: CommonLayoutComponent,
    loadChildren: 'app/dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'manage',
    canActivate: [ UserAuthenticatedGuard ],
    component: CommonLayoutComponent,
    loadChildren: 'app/manage/manage.module#ManageModule'
  },
  { path: '**', redirectTo: 'auth' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule {
}
