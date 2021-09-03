import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UrlConfigService} from './url-config.service';
import {SessionConfigService} from './session-config.service';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private urls;
  private base_url;

  constructor(private httpClient: HttpClient , private UrlConfig: UrlConfigService ,  private dataService: SessionConfigService ) {
    this.urls = this.UrlConfig.getUrls();
    this.base_url = this.UrlConfig.base_url;
  }
  get(url, callback, error): void;
  get(url, callback, error, options): void;

  get(url, callback, error, options?: any) {
    let headers = {};
    let path = this.getUrl(url);
    if (options !== undefined) {
      if (options.params === undefined) {
        headers = options;
      } else {
        options.params.forEach(each => {
          path += '/' + each;
        });
      }

    }
    console.log(headers);
    this.httpClient.get(path, headers)
      .toPromise().then(callback).catch(error);

  }
  post(url, body, callback, error, options) {
    let headers = {};
    if (options !== undefined) {
    headers = options;
    }
    this.httpClient.post(this.getUrl(url), body , headers)
    .toPromise().then(callback).catch(error);
  }
  put(url, body, callback, error) {
    this.httpClient.put(this.getUrl(url), body)
      .toPromise().then(callback).catch(error);

  }

  delete(url, body, callback, error) {
    this.httpClient.delete(this.getUrl(url), body)
      .toPromise().then(callback).catch(error);

  }

  getUrl(name) {
    return this.base_url + this.urls[name];
  }

}
