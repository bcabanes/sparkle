import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// app
import { ProfileEditComponent } from './components';

const routes: Routes = [
  { path: 'edit', component: ProfileEditComponent },
  { path: '', pathMatch: 'full', redirectTo: 'edit' }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class ProfileRoutingModule {
}
