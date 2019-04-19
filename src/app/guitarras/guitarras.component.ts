import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import Datos from '../../assets/instrumentos.json';

@Component({
	selector: 'app-guitarras',
	templateUrl: './guitarras.component.html',
	styleUrls: [ './guitarras.component.css' ]
})
export class GuitarrasComponent implements OnInit {
	public data;
	public categorias = Array<String>();

	constructor(private titleService: Title) {}

	ngOnInit() {
		$('#guitarras').css('textDecoration', 'underline');
		this.titleService.setTitle('Carpinteria Schmidt | Instrumentos Musicales');

		this.categorias = Object.keys(Datos);

		var datos = JSON.stringify(Datos);
		this.data = JSON.parse(datos);
	}
}
