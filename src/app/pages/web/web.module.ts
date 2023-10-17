import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebComponent } from './web.component';
import { WebRoutingModule } from './web-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { CoreModule } from 'src/app/core.module';
import { HeaderComponent } from './components/header/header.component';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BlogPreviewComponent } from './components/blog-preview/blog-preview.component';
import { BlogViewComponent } from './components/blog-view/blog-view.component';

@NgModule({
  declarations: [
    WebComponent,
    HeaderComponent,
    BlogListComponent,
    ProfileComponent,
    BlogPreviewComponent,
    BlogViewComponent,
  ],
  imports: [
    CommonModule,
    WebRoutingModule,
    MaterialModule,
    CoreModule,
  ],
})
export class WebModule { }
