import { AuthGuard } from './auth-gaurd.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AdminAuthGuard extends AuthGuard {

  canActivate() {
    const  isAuthenticated = super.canActivate();
    if (!isAuthenticated) { return false; }
    if (this.authService.currentUser) {
      return true;
     }
     else {
    this.router.navigate(['./login']);
    return false;
  }
  }
}
