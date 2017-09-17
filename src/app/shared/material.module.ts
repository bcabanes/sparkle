import { NgModule } from '@angular/core';

import {
  MdButtonModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdRadioModule,
  MdSelectModule,
  MdToolbarModule
} from '@angular/material';

import 'hammerjs';

const ComponentModules: any[] = [
  MdButtonModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdRadioModule,
  MdSelectModule,
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
