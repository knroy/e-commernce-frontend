import { Component, OnInit } from '@angular/core';
import { BackendService } from "../../../services/backend.service";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { TokenService } from "../../../services/token.service";

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
              private tokenService: TokenService) {
  }

  ngOnInit(): void {
  }

  onSubmitForm() {
    const data = this.authenticationForm.getRawValue();
    this.backendService.Authenticate(data).subscribe((response: any) => {
      if (response.Success) {
        const token = response.Token;
        this.tokenService.setToken(token);
      }
    })
  }
}
