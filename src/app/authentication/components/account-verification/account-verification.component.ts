import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { BackendService } from "../../../services/backend.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-account-verification',
  templateUrl: './account-verification.component.html',
  styleUrls: ['./account-verification.component.scss']
})
export class AccountVerificationComponent implements OnInit {

  isLoading = true;
  isVerified = false;

  constructor(private activatedRoute: ActivatedRoute,
              private backendService: BackendService,
              private snackBar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe((params: any) => {
      if (params.token) {
        this.verifyAccount(params.token);
      }
    })

  }

  verifyAccount(token: string) {

    this.backendService.AccountVerify(token).subscribe((response: any) => {
      if (response.Success) {
        this.snackBar.open("Account verified",
          undefined, { duration: 3000 });
        this.isLoading = false;
        this.isVerified = true;
        this.router.navigate(['/auth/login']).then();
      }
    }, (error: any) => {
      this.snackBar.open(error?.error?.Verification,
        undefined, { duration: 3000 });
      this.isVerified = false;
      this.isLoading = false;
    })

  }

  redirectToLogin() {
    this.router.navigate(['/auth/login']).then();
  }

}
