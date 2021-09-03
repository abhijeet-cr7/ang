import { browser } from 'protractor';
import { SessionConfigService } from './session-config.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EncrService } from './encr.service';


@Injectable({
  providedIn: 'root'
})
export class SmsService {
private token: any;
private sessionid;
private login_name;
private menus;
private rolename;
private browser_name;
private browserversion;
private emailid;
private remoteip;
private staffid;
private studentid: number;
private theme;
private userid;
private username;
  constructor(private encr: EncrService, session: SessionConfigService, private router: Router) {
   this.token = localStorage.getItem('token');
   this.getDecreptToken();
  }

 getToken() {
   return this.token;
 }
 settokenId(tokenId) {
  localStorage.setItem('token', tokenId);
  this.token = tokenId;
}

logOut() {
  localStorage.removeItem('token');
  this.token = null;
  this.router.navigate(['/login']);
}

 getDecreptToken() {
  if (this.token) {
 const token = this.getToken();
  const res = token.replace(/,/g, '+');
  const res1 = res.replace(/~/g, '=');
   const dectoken = this.encr.Decrypt(res1);
   const dectObj = JSON.parse(dectoken);
   console.log(dectObj);
   this.sessionid = dectObj.sessionid;
   this.menus = dectObj.menus;
   this.rolename = dectObj.role;
   this.browser_name = dectObj.browser_name;
   this.browserversion = dectObj.browserversion;
   this.emailid = dectObj.emailid;
   this.remoteip = dectObj.remoteip;
   this.staffid = dectObj.staffid;
   this.studentid = dectObj.student_id as number;
   console.log(this.studentid);
   this.theme = dectObj.theme;
   this.userid = dectObj.userid;
   this.username = dectObj.username;
   this.login_name = dectObj.login_name;
  } else {
    this.router.navigate(['/login']);
  }
 }
  getMenus(): any[] {
    return this.menus;
  }

  getRolename() {
    return this.rolename;
  }
  getsessionid() {
  return this.sessionid;
}
  getbrowser_name() {
  return this.browser_name;
  }
  getbrowserversion() {
  return  this.browserversion;
  }
  getemailid() {
    return this.emailid;
  }
  getremoteip() {
    return this.remoteip;
  }
  getstaffid() {
    return this.staffid;
  }
  getstudentid() {
   return this.studentid;
  }
  gettheme() {
    return this.theme;
  }
  getuserid() {
    return this.userid;
  }
  getusername() {
    return this.username;
  }
  getloginname() {
    return this.login_name;
  }
  }
