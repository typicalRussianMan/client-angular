import { RouterModule, Routes } from "@angular/router";
import { WebComponent } from "./web.component";
import { NgModule } from "@angular/core";
import { BlogListComponent } from "./components/blog-list/blog-list.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { AuthGuard } from "src/app/guards/auth.guard";
import { BlogViewComponent } from "./components/blog-view/blog-view.component";

const routes: Routes = [
  {
    path: '',
    component: WebComponent,
    children: [
      {
        path: 'blogs',
        children: [
          {
            path: '',
            component: BlogListComponent,
          },
          {
            path: ':id',
            component: BlogViewComponent,
          }
        ],
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: '**',
        redirectTo: 'blogs',
      },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebRoutingModule { }

