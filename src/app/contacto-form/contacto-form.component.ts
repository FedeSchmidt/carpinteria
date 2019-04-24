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
	form: FormGroup;

	constructor(
		private _route: ActivatedRoute,
		private _mensajeService: MensajeService,
		private titleService: Title,
		private formBuilder: FormBuilder
	) {
		this.mensaje = new Mensaje('', '', '', '', '');
		this.status = '';
	}

	ngOnInit() {
		$('#inicio').css('textDecoration', 'none');
		$('#instrumentos').css('textDecoration', 'none');
		$('#venta').css('textDecoration', 'none');
		$('#contacto').css('textDecoration', 'underline');
		$('#galeria').css('textDecoration', 'none');

		this.titleService.setTitle('Carpinteria Schmidt | Contacto');

		this.form = this.formBuilder.group({
			nombre: [ '', Validators.required ],
			apellido: [ '', Validators.required ],
			email: [ '', [ Validators.required, Validators.email ] ],
			telefono: [ '' ],
			mensaje: [ '', Validators.required ]
		});
	}

	onSubmit(form) {
		this.status = 'enviando';

		console.log(this.mensaje);

		this._mensajeService.enviar(this.mensaje).subscribe(
			(response) => {
				if (response.status == 'success') {
					this.mensaje = new Mensaje('', '', '', '', '');
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

		form.reset();
	}
}
