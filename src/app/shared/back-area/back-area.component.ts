import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-back-area',
  templateUrl: './back-area.component.html',
  styleUrls: ['./back-area.component.css']
})
export class BackAreaComponent implements OnInit {

  @Input()title:string;
  @Input()urldestino:string;
  @Input()isAgregar:boolean = true;
  @Input()isEditar:boolean = true;
  @Input()textButon:string;

  
  constructor(
    private _location: Location,
  ) { }

  ngOnInit(): void {
  }

  goBack() {
    this._location.back(); // <-- go back to previous location on cancel
  }

}
