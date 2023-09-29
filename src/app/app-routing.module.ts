import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AuthGuard } from './guards/auth.guard';
import { BlogsComponent } from './pages/admin/components/blogs/blogs.component';
import { CreateBlogComponent } from './pages/admin/components/create-blog/create-blog.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'blogs',
        // component: BlogsComponent,
        children: [
          {
            path: '',
            component: BlogsComponent,
          },
          {
            path: 'new',
            component: CreateBlogComponent,
          },
          {
            path: 'edit/:id',
            component: CreateBlogComponent
          }

        ]
      },
      {
        path: '**',
        redirectTo: 'blogs',
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'admin',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
