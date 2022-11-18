import { Component, OnInit } from '@angular/core';
import {PagecolorService} from "../pagecolor.service";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.sass']
})
export class ErrorComponent implements OnInit {

  constructor(public colorservice:PagecolorService) { }

  ngOnInit(): void {
  }

}
