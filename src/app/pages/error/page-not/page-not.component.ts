import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { changedRouting } from 'src/app/core/shared/function/changedRouting';
import { getbackbutton } from 'src/app/core/shared/@subject/subjects';
@Component({
  selector: 'app-page-not',
  templateUrl: './page-not.component.html',
  styleUrls: ['./page-not.component.scss']
})
export class PageNotComponent implements OnInit {

  constructor(private _location: Location,
    private _changedRouting:changedRouting) { }

  ngOnInit(): void {
  }

  backbutton(){
    getbackbutton(true);
    this._location.back();
  }
}
