import { NgModule } from '@angular/core';
// app
import { STATISTIC_COMPONENTS } from './components';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ...STATISTIC_COMPONENTS
  ],
  imports     : [
    SharedModule
  ],
  exports: [
    ...STATISTIC_COMPONENTS
  ]
})
export class StatisticModule {
}
