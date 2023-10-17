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
import { HttpClient } from '@angular/common/http';
import { ApiMockService } from 'src/app/services/api-mock.service';

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
  providers: [
    {
      provide: HttpClient,
      useClass: ApiMockService,
    }
  ]
})
export class WebModule { }
