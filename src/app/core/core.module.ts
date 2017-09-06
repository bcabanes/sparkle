import { NgModule } from '@angular/core';
// app
import { environment } from '../../environments/environment';
import { ApiUrl } from './tokens';

@NgModule({
  providers: [
    { provide: ApiUrl, useValue: environment.firebase.databaseURL }
  ]
})
export class CoreModule {
}
