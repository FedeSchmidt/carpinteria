import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-guitarras',
  templateUrl: './guitarras.component.html',
  styleUrls: ['./guitarras.component.css']
})
export class GuitarrasComponent implements OnInit {

  constructor(private titleService: Title ) { }

  ngOnInit() {

  	$("#guitarras").css("textDecoration", "underline");
  	this.titleService.setTitle( "Carpinteria Schmidt | Guitarras" );
  }

}
