import { Injectable } from '@angular/core';
import { User } from "../interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user?: User;

  constructor() {

  }

  setUser(response: any) {
    this.user = response;
  }

  getUser(): User | undefined {
    return this.user;
  }

}
