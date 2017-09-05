import { NgModule } from '@angular/core';
// app
import { SharedModule } from '../shared';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DeckModule } from '../decks/deck.module';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    DashboardRoutingModule,
    DeckModule,
    SharedModule
  ]
})
export class DashboardModule {
}
