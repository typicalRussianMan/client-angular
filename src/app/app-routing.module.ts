import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AuthGuard } from './guards/auth.guard';
import { BlogsComponent } from './pages/admin/components/blogs/blogs.component';
import { BlogEditFormComponent } from './pages/admin/components/create-blog/blog-edit-form.component';

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
        children: [
          {
            path: '',
            component: BlogsComponent,
          },
          {
            path: 'new',
            component: BlogEditFormComponent,
          },
          {
            path: 'edit/:id',
            component: BlogEditFormComponent,
          },
        ],
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
