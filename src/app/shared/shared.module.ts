import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// app
import { SHARED_COMPONENTS } from './components/index';
import { MaterialModule } from './material.module';


const MODULES: any[] = [
  CommonModule,
  FormsModule,
  HttpModule,
  ReactiveFormsModule,
  RouterModule,
  MaterialModule
];

@NgModule({
  declarations: [
    ...SHARED_COMPONENTS
  ],
  imports: [
    ...MODULES
  ],
  exports: [
    ...MODULES,
    ...SHARED_COMPONENTS
  ]
})
export class SharedModule {
}
