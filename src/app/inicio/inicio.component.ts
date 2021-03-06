import { Component, OnInit } from '@angular/core';
import Datos from '../../assets/datos-inicio.json';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'app-inicio',
	templateUrl: './inicio.component.html',
	styleUrls: [ './inicio.component.css' ]
})
export class InicioComponent implements OnInit {
	public inicio: Array<Array<String>>;

	constructor(private titleService: Title) {}

	ngOnInit() {
		this.titleService.setTitle('Carpinteria de Omar Schmidt');

		$('#instrumentos').css('textDecoration', 'none');
		$('#venta').css('textDecoration', 'none');
		$('#contacto').css('textDecoration', 'none');
		$('#galeria').css('textDecoration', 'none');

		$('#inicio').css('textDecoration', 'underline');

		this.inicio = [];

		var data = JSON.stringify(Datos);

		this.leerInicio(JSON.parse(data));
	}

	leerInicio(datos) {
		var fila;

		for (let i in datos) {
			fila = [ datos[i].titulo, datos[i].descripcion, datos[i].imagenes ];

			this.inicio.push(fila);
		}
	}
}
