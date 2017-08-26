import { NgModule } from '@angular/core';

import {
  MdButtonModule,
  MdInputModule
} from '@angular/material';

import 'hammerjs';

const ComponentModules: any[] = [
  MdButtonModule,
  MdInputModule
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
