import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { Title } from '@angular/platform-browser';
import Datos from '../../assets/datos.json';

@Component({
	providers: [ HeaderComponent ],
	selector: 'app-categoria-producto',
	templateUrl: './categoria-producto.component.html',
	styleUrls: [ './categoria-producto.component.css' ]
})
export class CategoriaProductoComponent implements OnInit {
	public productos: Array<Array<String>>;
	public data = JSON.stringify(Datos);
	public datos = JSON.parse(this.data);
	filtroActivo;

	constructor(private comp: HeaderComponent, private titleService: Title) {
		this.productos = [];

		this.cargarProductos(this.datos);
	}

	ngOnInit() {
		$('#galeria').css('textDecoration', 'underline');

		this.titleService.setTitle('Carpinteria Schmidt | Galeria');
	}

	cargarProductos(datos) {
		var c, objeto, producto;

		for (let cat in Object.keys(datos)) {
			c = Object.keys(datos)[cat];

			if (c !== 'tirantes' && c !== 'machimbre' && c !== 'vigas' && c !== 'venta-otros') {
				for (let i in datos[c]) {
					objeto = datos[c][i];
					//Arreglo tiene [id, titulo, descripcion, imagen 1 y categoria]
					producto = [ objeto.id, objeto.titulo, objeto.descripcion, objeto.imagenes[0], c ];

					this.productos.push(producto);
				}
			}
		}
	}

	mostrarTodos() {
		if (this.filtroActivo !== null) {
			$('#' + this.filtroActivo).toggleClass('activo');
		}
		$('#btnTodos').toggleClass('activo');
		this.filtroActivo = 'btnTodos';

		this.productos = [];

		this.cargarProductos(this.datos);
	}

	filtrar(categoria, id) {
		if (this.filtroActivo !== null) {
			$('#' + this.filtroActivo).toggleClass('activo');
		}
		$('#' + id).toggleClass('activo');
		this.filtroActivo = id;

		var columna, imagen, texto, objeto, producto;

		this.productos = [];

		var arreglo = this.datos[categoria];

		if (arreglo !== undefined) {
			if (arreglo.length > 0) {
				for (let i in arreglo) {
					objeto = arreglo[i];

					producto = [ objeto.id, objeto.titulo, objeto.descripcion, objeto.imagenes[0], categoria ];

					this.productos.push(producto);
				}
			}
		}
	}

	click() {
		this.comp.click('contacto');
	}

	clickDropdown() {
		$('#flechaUp').toggleClass('no-flecha');
		$('#flechaDown').toggleClass('no-flecha');
	}
}
