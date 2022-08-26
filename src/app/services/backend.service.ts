import { Injectable } from '@angular/core';
import { Authenticate } from "../interfaces/authenticate.interface";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private baseUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {

  }

  Authenticate(authenticate: Authenticate) {
    let url = `${this.baseUrl}/Authentication/Login`;
    return this.httpClient.post(url, authenticate);
  }

}
