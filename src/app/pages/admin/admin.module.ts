import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';

import { MenuComponent } from './components/menu/menu.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { BlogEditFormComponent } from './components/blog-edit-form/blog-edit-form.component';
import { RubricsComponent } from './components/rubrics/rubrics.component';
import { RubricEditFormComponent } from './components/rubric-edit-form/rubric-edit-form.component';

@NgModule({
  declarations: [
    AdminComponent,
    MenuComponent,
    BlogsComponent,
    BlogEditFormComponent,
    RubricsComponent,
    RubricEditFormComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
  ]
})
export class AdminModule { }
