import { NgModule } from '@angular/core';

import {
  MdButtonModule,
  MdInputModule,
  MdToolbarModule
} from '@angular/material';

import 'hammerjs';

const ComponentModules: any[] = [
  MdButtonModule,
  MdInputModule,
  MdToolbarModule
];

@NgModule({
  imports: [
    ...ComponentModules,
  ],
  exports: [
    ...ComponentModules
  ]
})
export class MaterialModule {
}
