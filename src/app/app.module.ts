import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthModule } from './pages/auth/auth.module';
import { AdminModule } from './pages/admin/admin.module';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { BlogsComponent } from './pages/admin/components/blogs/blogs.component';
import { BlogEditFormComponent } from './pages/admin/components/blog-edit-form/blog-edit-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RubricsComponent } from './pages/admin/components/rubrics/rubrics.component';
import { RubricEditFormComponent } from './pages/admin/components/rubric-edit-form/rubric-edit-form.component';

@NgModule({
  declarations: [
    AppComponent,
    BlogsComponent,
    BlogEditFormComponent,
    RubricsComponent,
    RubricEditFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AdminModule,
    AuthModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
