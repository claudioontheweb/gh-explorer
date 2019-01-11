import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDividerModule, MatListModule, MatToolbarModule} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatListModule,
    MatDividerModule
  ],
  exports: [
    MatToolbarModule,
    MatListModule,
    MatDividerModule
  ]
})
export class MaterialModule { }
