import { Component, OnInit } from '@angular/core';
import { BackendService } from "../../../services/backend.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { TokenService } from "../../../services/token.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent implements OnInit {

  authenticationForm = new FormGroup(
    {
      Email: new FormControl('', [Validators.required, Validators.email]),
      Password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    }
  );

  constructor(private backendService: BackendService,
              private tokenService: TokenService,
              private matSnackbar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmitForm() {
    const data = this.authenticationForm.getRawValue();
    this.backendService.Authenticate(data).subscribe((response: any) => {
      if (response.Success) {
        const token = response.Token;
        this.tokenService.setToken(token);
        this.matSnackbar.open('Login success', undefined, {
          duration: 3000
        });
        this.router.navigate(['/']).then();
      }
    }, (errorResponse: any) => {
      let errorMessage = errorResponse?.error?.Message;
      if (errorMessage) {
        this.matSnackbar.open(errorMessage, undefined, {
          duration: 3000
        })
      }
    })
  }
}
