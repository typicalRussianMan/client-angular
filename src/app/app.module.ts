import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthModule } from './pages/auth/auth.module';
import { AdminModule } from './pages/admin/admin.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    AuthModule,
    AdminModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
