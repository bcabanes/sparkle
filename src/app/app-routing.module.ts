import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// app
import { BlankLayoutComponent, CommonLayoutComponent } from './layouts';
import { UserGuard } from './user/user.guard';

const routes: Routes = [
  {
    path: 'auth',
    component: BlankLayoutComponent,
    loadChildren: 'app/authentication/authentication.module#AuthenticationModule'
  },
  {
    path: 'dashboard',
    canActivate: [ UserGuard ],
    component: CommonLayoutComponent,
    loadChildren: 'app/dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'manage',
    canActivate: [ UserGuard ],
    component: CommonLayoutComponent,
    loadChildren: 'app/manage/manage.module#ManageModule'
  },
  { path: '**', redirectTo: 'auth/login'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule {
}
