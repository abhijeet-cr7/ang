// import { Component, OnInit } from '@angular/core';

// @Component({

// })
// export class ViewEngineComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
import { Component, ElementRef, Input, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpHeaders } from '@angular/common/http';
import { CommonService } from '../helper/common.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription, Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-view-engine',
  templateUrl: './view-engine.component.html',
  styleUrls: ['./view-engine.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class ViewEngineComponent implements OnInit {
  constructor(
    private snackBar: MatSnackBar,
    private elementRef: ElementRef,
    private common: CommonService,
    private router: Router,
    public http: HttpClient
  ) {
    this.element = elementRef.nativeElement;
  }
  @Input('appStepperPosition') position: 'top' | 'bottom';
  element: any;
  disableValidate: boolean;
  disableSubmit: boolean;
  changeText: boolean;
  title = 'runEngine';
  editable = true;
  listArr = [];
  sampleArray;
  data: any;
  dataParam: string;
  headers: any;
  params: { headers: any };
  success: any;
  error: any;
  body: string;
  arr = [];
  count = 1;
  priority: any = [];
  regex1 = /popm/i;
  regex2 = /wms_release/i;
  regex3 = /full refresh/i;
  ngOnInit = () => {};
  AfterViewInit(): void {
    if (this.position === 'bottom') {
      const header = this.element.children[0];
      const content = this.element.children[1];
      this.element.insertBefore(content, header);
    }
  }
  copyToClipboard = () => {
    this.snackBar.open('Copied To ClipBoard', '', {
      duration: 2000,
    });
  };
  additem = (text) => {
    if (text === 'POPM') {
      this.sampleArray =
        '{"EVENT_ID":"2","EVENT_GEN_TS":"","EVENT_PRIORITY": "1","EVENT_TYPE":"POPM_UI","PROG_CODE":"POPM_RQTY_CHANGE","DIVISION_ID": "1","ORGANIZATION_CODE": "905","ITEM_CODE": "08185","LINES":[{"ORDER_ID":"80712","ORDER_LINE_ID":"1545983","NEW_REQUESTED_QTY":"7","OLD_REQUESTED_QTY":"1"}]}';
    }
    if (text === 'WMS_Release') {
      this.sampleArray =
        '{"EVENT_ID": "2", "EVENT_GEN_TS": "2021-04-29 12:53:11", "EVENT_PRIORITY": "1", "EVENT_TYPE": "WMS_RELEASE", "DIVISION_ID": "1","ORDER_IDS": [96481], "DEPT_CODE": "R","WMS_RELEASE_ID": "12051457"}';
    }
    if (text === 'Full Refresh') {
      const date = new Date();
      // tslint:disable-next-line: max-line-length
      const datee =
        date.getDate() +
        '/' +
        (date.getMonth() + 1) +
        '/' +
        date.getFullYear() +
        '_' +
        date.getHours() +
        ':' +
        date.getMinutes();
      this.sampleArray =
        '{"EVENT_ID":"1178","EVENT_UUID":"' +
        this.createUUID().toString() +
        '","EVENT_GEN_TS": "' +
        datee.toString() +
        '","EVENT_PRIORITY": "1","EVENT_TYPE":"FULL_REFRESH","DIVISION_ID":"1"}';
    }
    if (text !== '') {
      this.disableValidate = false;
      this.disableSubmit = false;
      this.listArr.push({
        text,
        array: this.sampleArray,
        data: '',
        count: this.count,
      });
      this.count++;
    }
  };
  removeItem = (index: number) => {
    this.listArr.splice(index, 1);
    this.priority.splice(index, 1);
  };
  createUUID = () => {
    let dt = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        const r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
    return uuid;
  };
  drop = (event: CdkDragDrop<string[]>) => {
    this.listArr = event.container.data;
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  };
  selectionChange = (e) => {
    let count = 0;
    this.listArr.forEach((element) => {
      if (element.data === '') {
        count = 1;
      }
    });
    if (count === 0) {
      this.editable = false;
      this.disableValidate = false;
    } else {
      this.disableValidate = true;
      this.snackBar.open('Please fill all the requests', '', {
        duration: 2000,
      });
    }
  };
  getData = (e, i) => {
    this.listArr[i].data = e;
  };
  vadlidate = () => {
    this.listArr.map((item, index) => {
      if (item.text === 'POPM') {
        this.startPopm(item.data, index);
      } else if (item.text === 'WMS_Release') {
        this.startWms(item.data, index);
      } else if (item.text === 'Full Refresh') {
        this.startFullRefresh(item.data, index);
      }
    });
  };
  showVal(text) {
    console.log(text);
  }
  startPopm = (data, index) => {
    this.data = JSON.parse(data);
    this.dataParam = JSON.stringify(this.data);
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.params = { headers: this.headers };
    this.success = this.onSuccessStartPopm.bind(this, index);
    this.error = this.onErrorStartPopm.bind(this);
    this.body = this.dataParam;
    this.common.http.post(
      'validkeys',
      this.body,
      this.success,
      this.error,
      this.params
    );
  };
  onSuccessStartPopm = (data, index) => {
    if (data.status === 'completed' && data.keys.POPM_UI.length > 0) {
      this.listArr[index] = {
        ...this.listArr[index],
        message: data.keys.POPM_UI,
        status: 'success',
      };
    }
    if (data.status === 'completed' && data.keys.POPM_UI.length === 0) {
      this.listArr[index] = {
        ...this.listArr[index],
        message: data.keys.POPM_UI,
        status: 'fail',
      };
    }
    console.log(data);
  };
  onErrorStartPopm = (data) => {
    console.log(data);
  };
  startWms = (data, index) => {
    this.data = JSON.parse(data);
    this.dataParam = JSON.stringify(this.data);
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.params = { headers: this.headers };
    this.success = this.onSuccessStartWms.bind(this, index);
    this.error = this.onErrorStartWms.bind(this, index);
    this.body = this.dataParam;
    this.common.http.post(
      'validkeys',
      this.body,
      this.success,
      this.error,
      this.params
    );
  };
  onSuccessStartWms = (data, index) => {
    console.log(data);
    if (data.status === 'completed' && data.keys.POPM_UI.length > 0) {
      this.listArr[index] = {
        ...this.listArr[index],
        message: data.keys.POPM_UI,
        status: 'success',
      };
    }
    if (data.status === 'completed' && data.keys.POPM_UI.length === 0) {
      this.listArr[index] = {
        ...this.listArr[index],
        message: data.keys.POPM_UI,
        status: 'fail',
      };
    }
  };
  onErrorStartWms = (data, index) => {
    console.log(data);
  };
  startFullRefresh = (data, index) => {
    this.data = data;
    this.dataParam = JSON.stringify(this.data);
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.params = { headers: this.headers };
    this.success = this.onSuccessStartFullRefresh.bind(this, index);
    this.error = this.onErrorStartFullRefresh.bind(this, index);
    this.body = this.dataParam;
    this.common.http.post(
      'validkeys',
      this.body,
      this.success,
      this.error,
      this.params
    );
  };
  onSuccessStartFullRefresh = (data, index) => {
    console.log(data);
    if (data.status === 'completed' && data.keys.POPM_UI.length > 0) {
      this.listArr[index] = {
        ...this.listArr[index],
        message: data.keys.POPM_UI,
        status: 'success',
      };
    }
    if (data.status === 'completed' && data.keys.POPM_UI.length === 0) {
      this.listArr[index] = {
        ...this.listArr[index],
        message: data.keys.POPM_UI,
        status: 'fail',
      };
    }
  };
  onErrorStartFullRefresh = (data, index) => {
    console.log(data);
  };
  viewHistory = () => {
    this.router.navigate(['/viewHistory']);
  };
  selectChangeHandler = ($event, name) => {
    event.preventDefault();
    this.priority.push({ name: name, priority: $event });
  };
  submitBtn = () => {
    console.log(this.priority);
    let length = this.priority.length;
    let parentArr = [];
    for (var i = 0; i < length; i++) {
      parentArr.push([]);
    }
    for (var j = 1; j <= length; j++) {
      for (var i = 0; i < length; i++) {
        if (this.priority[i].priority == j) {
          parentArr[j - 1].push(this.priority[i].name);
        }
      }
    }
    console.log(parentArr);
    for (var i = 0; i < length; i++) {
      parentArr[i].map((item) => {
        if (this.regex1.test(item) && this.regex2.test(item)) {
          forkJoin([
            this.http
              .post('url', {})
              .toPromise()
              .then((data: any) => {
                console.log(data);
              }),
          ]);
        } else if (this.regex2.test(item) && this.regex3.test(item)) {
        } else if (this.regex1.test(item) && this.regex3.test(item)) {
        } else if (
          this.regex1.test(item) &&
          this.regex2.test(item) &&
          this.regex3.test(item)
        ) {
        } else if (this.regex1.test(item)) {
        } else if (this.regex2.test(item)) {
        } else if (this.regex3.test(item)) {
        }
      });
    }
    // if(this.priority.length==0) {

    // }
    // this.priority.map((item) => {
    //   if (item.priority == 1) {
    //     this.p1.push(item.name);
    //   } else if (item.priority == 2) {
    //     this.p2.push(item.name);
    //   } else if (item.priority == 3) {
    //     this.p3.push(item.name);
    //   } else if (item.priority == 4) {
    //     this.p4.push(item.name);
    //   }
    // });
    // console.log('p1-', this.p1, 'p2-', this.p2, 'p3-', this.p3, 'p4-', this.p4);
    // for (var i = 0; i < this.p1.length; i++) {
    //   if (regex1.test(this.p1[i]) && regex2.test(this.p1[i])) {
    //     // call popm and wms release api at a time using fork.
    //   } else if (regex1.test(this.p1[i]) && regex3.test(this.p1[i])) {
    //     // call popm and full refresh api at a time using fork.
    //   } else if (regex3.test(this.p1[i]) && regex2.test(this.p1[i])) {
    //     //  call full refresh and wms release at a time using fork.
    //   } else if (
    //     regex1.test(this.p1[i]) &&
    //     regex2.test(this.p1[i]) &&
    //     regex3.test(this.p1[i])
    //   ) {
    //     // call all 3 api's at a time
    //   } else if (regex1.test(this.p1[i])) {
    //     // call popm
    //   } else if (regex2.test(this.p1[i])) {
    //     // call wms
    //   } else if (regex3.test(this.p1[i])) {
    //     // call full refresh
    //   }
    // }
  };
}

// ['fullrefresh', 'popm'] --> [0]
// wms
