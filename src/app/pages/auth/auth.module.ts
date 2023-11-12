import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';

import { AuthComponent } from './auth.component';
import { CoreModule } from 'src/app/core.module';
import { WebAuthComponent } from './components/web-auth/web-auth.component';
import { AdminAuthComponent } from './components/admin-auth/admin-auth.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [
    AuthComponent,
    WebAuthComponent,
    AdminAuthComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    CoreModule,
  ],
  exports: [AuthComponent]
})
export class AuthModule { }
