import { map, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ToastrManager } from 'ng6-toastr-notifications';

@Injectable()
export class AuthService {

  currentValue: any;

  private headers = new Headers({'Content-Type': 'application/json'});
  currentUser: any;
    //  url: String = 'http://stagemkw.buildupshot.com/v01';
    
  // url: String = 'http://192.168.1.85:5225/';
  // url: String = 'http://ec2-3-129-111-108.us-east-2.compute.amazonaws.com/';

   url: String = 'http://ec2-3-21-194-78.us-east-2.compute.amazonaws.com/';

  // url: String = 'https://stage.intellobots.com/v01';
  // url: String = 'http://dev.buildupshot.com/v01';

  constructor(private http: Http , private router: Router, public toastr: ToastrManager) {
    const token = localStorage.getItem('userid');

    if (token) {
      this.currentUser = (token);
    } else {
      this.router.navigate(['/login']);
    }
  }

  login(data, loginwith) {
    if (loginwith === 0) {
      data = { 'credential': data.username, 'password': data.password, 'credential_status': 0};
    } else if (loginwith === 1) {
      data = { 'credential': data.username, 'password': data.password, 'credential_status': 1};
    }
     return this.http.post(this.url + 'v3/login', data, {headers: this.headers})
   .map(response => {const result = response.json();
// alert(result.message);


      if (result.status === true) {
        if (result.data.is_phone_verified === 1) {
          localStorage.setItem('userid', result.data.userid);
          localStorage.setItem('sessiontoken', result.data.token);
          localStorage.setItem('usernamelog', result.data.username);
          localStorage.setItem('userimglog', result.data.userpic);
          return true;
        } else if (result.data.is_phone_verified === 0) {
          return false;
        }
      //  localStorage.setItem('role_name', result.Data.role_name);
      //  localStorage.setItem('roleid', result.Data.roleid);
      // this.currentUser = localStorage.getItem('role_name');
     // console.log(result);
    } else {
      this.toastr.errorToastr(result.message);
    return false;
    }
    });

  }

  logout() {
    localStorage.removeItem('userid');
    // localStorage.removeItem('sessiontoken');
    localStorage.setItem('sessiontoken', '');
    localStorage.setItem('userimglog', '');
    localStorage.removeItem('usernamelog');
    this.currentUser = null;
    this.router.navigate(['/login']);

  }

  isLoggedIn() {
    if (this.currentUser == null || this.currentUser === '') {
      return false;
    }
    return true;
  }
}

