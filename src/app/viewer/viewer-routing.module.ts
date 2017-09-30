import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewerComponent } from './viewer.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
  { path: ':deckUid', component: ViewerComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ]
})
export class ViewerRoutingModule {
}
