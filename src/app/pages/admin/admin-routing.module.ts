import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogsComponent } from './components/blogs/blogs.component';
import { BlogEditFormComponent } from './components/blog-edit-form/blog-edit-form.component';
import { RubricsComponent } from './components/rubrics/rubrics.component';
import { RubricEditFormComponent } from './components/rubric-edit-form/rubric-edit-form.component';
import { AdminComponent } from './admin.component';
import { TagsComponent } from './components/tags/tags.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
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
        path: 'rubrics',
        children: [
          {
            path: '',
            component: RubricsComponent,
          },
          {
            path: 'new',
            component: RubricEditFormComponent,
          },
          {
            path: 'edit/:id',
            component: RubricEditFormComponent,
          },
        ],
      },
      {
        path: 'tags',
        component: TagsComponent,
      },
      {
        path: '**',
        redirectTo: 'blogs',
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
