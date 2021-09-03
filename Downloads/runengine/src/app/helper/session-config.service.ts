import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionConfigService {
  public tokenId = null;


  constructor() {
    this.tokenId = localStorage.getItem('token');
   if (this.tokenId != null && this.tokenId !== 'null') {
    }

  }
  gettokenId() {
    return this.tokenId;
  }

  settokenId(tokenId) {
    localStorage.setItem('token', tokenId);
    this.tokenId = tokenId;
  }

  logOut() {
    localStorage.removeItem('token');
    this.tokenId = null;
  }

}
