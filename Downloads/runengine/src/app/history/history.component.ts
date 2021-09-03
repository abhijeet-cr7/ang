import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  viewHome = () => {
    this.router.navigate([ '/viewEngine' ]);
  }

}
