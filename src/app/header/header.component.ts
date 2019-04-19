import { Component, OnInit } from '@angular/core';
import $ from 'jquery';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: [ './header.component.css' ]
})
export class HeaderComponent implements OnInit {
	constructor() {}

	ngOnInit() {}

	click(id) {
		var idBoton = '#' + id;

		$('#inicio').css('textDecoration', 'none');
		$('#instrumentos').css('textDecoration', 'none');
		$('#venta').css('textDecoration', 'none');
		$('#contacto').css('textDecoration', 'none');
		$('#galeria').css('textDecoration', 'none');

		$(idBoton).css('textDecoration', 'underline');
	}
}
