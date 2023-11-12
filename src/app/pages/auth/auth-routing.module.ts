import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth.component";
import { AdminAuthComponent } from "./components/admin-auth/admin-auth.component";
import { WebAuthComponent } from "./components/web-auth/web-auth.component";

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'admin',
        component: AdminAuthComponent,
      },
      {
        path: 'web',
        component: WebAuthComponent,
      },
      {
        path: '**',
        redirectTo: 'web'
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
