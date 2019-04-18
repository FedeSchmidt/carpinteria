import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';

@Injectable()
export class MensajeService {
	public url: string;

	constructor(public _http: HttpClient) {
		this.url = GLOBAL.url;
	}

	enviar(mensaje): Observable<any> {
		let json = JSON.stringify(mensaje);

		let params = 'json=' + json;

		console.log(params);
		//let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			})
		};

		return this._http.post('http://localhost:3000/api/enviar', mensaje, httpOptions);
	}
}
