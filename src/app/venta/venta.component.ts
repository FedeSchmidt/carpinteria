import { Component, OnInit } from '@angular/core';
import Datos from '../../assets/datos.json';
import { HeaderComponent } from '../header/header.component';
import { Title } from '@angular/platform-browser';
import { HostListener } from '@angular/core';

@Component({
	providers: [ HeaderComponent ],
	selector: 'app-venta',
	templateUrl: './venta.component.html',
	styleUrls: [ './venta.component.css' ]
})
export class VentaComponent implements OnInit {
	public productos: Array<String>;
	public medidasTirantes: Array<String>;
	public medidasMachimbre: Array<String>;
	public medidasVigas: Array<String>;
	public otrosProductos: Array<String>;
	public imagenTirantes: String;
	public imagenMachimbre: String;
	public imagenTablas: String;

	constructor(private titleService: Title) {}

	ngOnInit() {
		this.titleService.setTitle('Carpinteria Schmidt | Tirantería y Machimbre');

		$('#inicio').css('textDecoration', 'none');
		$('#instrumentos').css('textDecoration', 'none');
		$('#venta').css('textDecoration', 'underline');
		$('#contacto').css('textDecoration', 'none');
		$('#galeria').css('textDecoration', 'none');

		const data = JSON.stringify(Datos);
		const datos = JSON.parse(data);

		this.productos = datos['tirantes'][0].imagenes.concat(datos['machimbre'][0].imagenes);

		this.medidasTirantes = datos['tirantes'][0].medidas;
		this.medidasMachimbre = datos['machimbre'][0].medidas;
		this.medidasVigas = datos['vigas'][0].medidas;
		this.otrosProductos = datos['venta-otros'][0].nombres;
		this.imagenMachimbre = datos['machimbre'][0].imagenes[0];
		this.imagenTirantes = datos['tirantes'][0].imagenes[0];
		this.imagenTablas = datos['tirantes'][0].imagenes[1];
	}

	ngAfterViewInit() {
		$('.image2').click(function(e) {
			var width = $(window).width();

			if (width > 991) {
				$('#modalVenta').css('display', 'block');

				let src = e.target.attributes.getNamedItem('src').textContent;
				$('#img01').attr('src', src);
			}
		});

		$('.close').click(function() {
			$('#modalVenta').css('display', 'none');
		});

		$('#modalVenta').on('click', function(e) {
			if (!$('#btn_izquierda').is(e.target) && !$('#btn_derecha').is(e.target) && !$('#img01').is(e.target)) {
				$('#modalVenta').css('display', 'none');
			}
		});
	}

	hallarSiguiente() {
		var src = $('#img01').attr('src');

		var siguiente;
		var i;
		var nueva;
		for (i = 0; i < this.productos.length; i++) {
			if (this.productos[i] === src) {
				siguiente = (i + 1) % this.productos.length;

				nueva = this.productos[siguiente];
				break;
			}
		}

		$('#img01').attr('src', nueva);
	}

	hallarAnterior() {
		var src = $('#img01').attr('src');

		var anterior;
		var i;
		var nueva;
		for (i = 0; i < this.productos.length; i++) {
			if (this.productos[i] === src) {
				anterior = (i - 1 + this.productos.length) % this.productos.length;

				nueva = this.productos[anterior];
				break;
			}
		}

		$('#img01').attr('src', nueva);
	}

	@HostListener('document:keyup', [ '$event' ])
	handleDeleteKeyboardEvent(event: KeyboardEvent) {
		if ($('#myModal').css('display') !== 'none') {
			if (event.key === 'ArrowRight') this.hallarSiguiente();
			else {
				if (event.key === 'ArrowLeft') this.hallarAnterior();
				else {
					if (event.key === 'Escape') $('#myModal').css('display', 'none');
				}
			}
		}
	}
}
