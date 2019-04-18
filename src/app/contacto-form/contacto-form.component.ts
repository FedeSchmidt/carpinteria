import { Component, OnInit, DoCheck } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Mensaje } from '../modelos/mensaje';
import { MensajeService } from '../services/mensaje.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'app-contacto-form',
	templateUrl: './contacto-form.component.html',
	styleUrls: [ './contacto-form.component.css' ],
	providers: [ MensajeService ]
})
export class ContactoFormComponent implements OnInit {
	public mensaje: Mensaje;
	public status: string;

	constructor(private _route: ActivatedRoute, private _mensajeService: MensajeService, private titleService: Title) {
		this.mensaje = new Mensaje('', '', '', '');
		this.status = '';
	}

	ngOnInit() {
		$('#contacto').css('textDecoration', 'underline');
		this.titleService.setTitle('Carpinteria Schmidt | Contacto');
	}

	onSubmit(form) {
		this.status = 'enviando';

		console.log(this.mensaje);

		this._mensajeService.enviar(this.mensaje).subscribe(
			(response) => {
				if (response.status == 'success') {
					this.mensaje = new Mensaje('', '', '', '');
					this.status = 'success';
					console.log('exito');
					form.reset();
				} else if (response.status == 'error') {
					this.status = 'error-datos';
					console.log('no 1');
					console.log(response.message);
				} else {
					this.status = 'error-api';
					console.log('no 2');
				}
			},
			(error) => {
				console.log(<any>error);

				this.status = 'error-api';
			}
		);
	}
}
