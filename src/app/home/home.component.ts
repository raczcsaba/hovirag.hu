import {Component, OnInit} from '@angular/core';
import { PagecolorService } from  '../pagecolor.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  colors:string[] = ['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty','twentyone','twentytwo','twentythree'];

  constructor(public colorService:PagecolorService) { }

  ngOnInit(): void {}

}
