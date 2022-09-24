import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLoginComponent } from "./components/auth-login/auth-login.component";
import { AuthRegisterComponent } from "./components/auth-register/auth-register.component";
import { AccountVerificationComponent } from "./components/account-verification/account-verification.component";

const routes: Routes = [
  {
    path: 'login',
    component: AuthLoginComponent
  },
  {
    path: 'register',
    component: AuthRegisterComponent
  },
  {
    path: 'verify',
    component: AccountVerificationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule {
}
