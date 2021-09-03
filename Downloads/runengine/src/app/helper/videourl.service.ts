import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Local } from 'protractor/built/driverProviders';
@Injectable({
  providedIn: 'root'
})
export class VideourlService {
  httpOptions = {
    headers: new HttpHeaders({
      //'Content-Type':  'application/x-www-form-urlencoded'
      'Content-Type': 'application/json'
    })
  };
  Url='https://stage.intellobots.com/'
  // Url = 'http://192.168.1.22:8080/Quarters/';
  constructor(private http: HttpClient) { }
  IsLogin() {
    return !!localStorage.getItem('token');
  }
  getform(url, perams) {

    return this.http.post(this.Url + url, perams, this.httpOptions);

  }


}