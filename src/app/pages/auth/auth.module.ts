import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';

import { AuthComponent } from './auth.component';
import { CoreModule } from 'src/app/core.module';

@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    CoreModule,
  ],
  exports: [AuthComponent]
})
export class AuthModule { }
