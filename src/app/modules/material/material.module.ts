import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule, MatChipsModule,
  MatDialogModule,
  MatDividerModule,
  MatIconModule,
  MatListModule, MatMenuModule,
  MatToolbarModule, MatTooltipModule
} from '@angular/material';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatListModule,
    MatDividerModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTooltipModule,
    MatChipsModule,
    MatMenuModule
  ],
  exports: [
    MatToolbarModule,
    MatListModule,
    MatDividerModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTooltipModule,
    MatChipsModule,
    MatMenuModule
  ]
})
export class MaterialModule { }
