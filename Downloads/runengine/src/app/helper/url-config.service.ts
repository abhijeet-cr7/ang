import { Injectable } from '@angular/core';

const Api = {
  'validkeys': 'validkeys/',
 
};


@Injectable({
  providedIn: 'root'
})

/*Need to change two URL's.
1) base_url for all api's
2)UploadURL for formdata api's(Uploads)*/


export class UrlConfigService {
  private jsonApi: any = Api;

  public base_url: String = 'http://127.0.0.1:8000/';


  public UploadURL = 'http://ec2-3-21-194-78.us-east-2.compute.amazonaws.com/';


  constructor() { }

  getUrls() {
    return this.jsonApi;
  }
}
