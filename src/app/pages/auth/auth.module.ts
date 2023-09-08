import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { MaterialModule } from 'src/app/material.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    AuthRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [AuthComponent]
})
export class AuthModule { }
