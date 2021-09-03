import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesCalculationsService {

  constructor() { }
  likes=1000;
  convertedCount;
  convertLikesCount(){
    if(this.likes > 0 && this.likes < 999){
       this.convertedCount=this.likes;
    }
    else if(this.likes > 999 && this.likes < 9999){
      
    }

  }
}
