import { APP_INITIALIZER, NgModule } from '@angular/core';

import { RootRoutingModule } from './root-routing.module';
import { BrowserModule } from "@angular/platform-browser";
import { RootDefaultComponent } from './components/root-default/root-default.component';
import { StartupService } from "../services/startup.service";
import { TokenService } from "../services/token.service";
import { UserService } from "../services/user.service";
import { BackendService } from "../services/backend.service";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

export function startupServiceFactory(startupService: StartupService,
                                      tokenService: TokenService): Function {

  const redirectLocations = [
    '/auth/login',
    '/auth/register',
    '/auth/verify'
  ]

  return () => {
    const token = tokenService.getToken();
    console.log(token);
    const location = window.location.pathname;
    if (!token) {
      if (redirectLocations.indexOf(location) < 0) {
        window.location.href = '/auth/login';
      }
    }
  }
}

@NgModule({
  declarations: [
    RootDefaultComponent
  ],
  bootstrap: [
    RootDefaultComponent
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: startupServiceFactory,
      deps: [StartupService, TokenService],
      multi: true
    },
    StartupService,
    TokenService,
    UserService,
    BackendService
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RootRoutingModule,
    BrowserAnimationsModule
  ]
})
export class RootModule {
}
