import { Injectable } from '@angular/core';

const ACCESS_TOKEN = "ACCESS_TOKEN";

@Injectable({
  providedIn: 'root'
})

export class TokenService {

  constructor() {

  }

  getToken() {
    return sessionStorage.getItem(ACCESS_TOKEN);
  }

  setToken(token: string) {
    sessionStorage.setItem(ACCESS_TOKEN, token);
  }

}
