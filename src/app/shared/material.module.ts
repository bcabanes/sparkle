import { NgModule } from '@angular/core';

import {
  MdButtonModule,
  MdCardModule,
  MdCheckboxModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdRadioModule,
  MdSelectModule,
  MdSlideToggleModule,
  MdToolbarModule
} from '@angular/material';

import 'hammerjs';

const ComponentModules: any[] = [
  MdButtonModule,
  MdCardModule,
  MdCheckboxModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdRadioModule,
  MdSelectModule,
  MdSlideToggleModule,
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
