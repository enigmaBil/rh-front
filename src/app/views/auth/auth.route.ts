import {Routes} from '@angular/router';

export const authRoute: Routes = [
  {
    path: "login",
    loadComponent: () => import("./login/login.component").then(c => c.LoginComponent)
  },
  {
    path: "reset-password",
    loadComponent: () => import("./reset-password/reset-password.component").then(c => c.ResetPasswordComponent)
  }
]
