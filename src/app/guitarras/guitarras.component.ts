import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import Datos from '../../assets/instrumentos.json';
import { HostListener } from '@angular/core';
import { BrowserStack } from 'protractor/built/driverProviders';

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
		var nueva = src;
		let items = Object.values(this.data);
		var array = [];
		for (let i = 0; i < items.length; i++) {
			array.push.apply(array, items[i]);
		}

		for (let i = 0; i < array.length; i++) {
			if (array[i] === src) {
				siguiente = (i + 1) % array.length;
				nueva = array[siguiente];
				break;
			}
		}

		$('#img01').attr('src', nueva);
	}

	hallarAnterior() {
		var src = $('#img01').attr('src');

		var anterior;
		var i;
		var nueva = src;

		let items = Object.values(this.data);
		var array = [];
		for (let i = 0; i < items.length; i++) {
			array.push.apply(array, items[i]);
		}

		for (let i = 0; i < array.length; i++) {
			if (array[i] === src) {
				anterior = (i - 1 + array.length) % array.length;
				nueva = array[anterior];
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
