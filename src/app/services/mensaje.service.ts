import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import nodemailer from 'nodemailer';



 
@Injectable()
export class MensajeService {

	public url: string;

  constructor(public _http: HttpClient) { 

  	this.url = GLOBAL.url;
  }

 enviar(mensaje): Observable<any>{

  
    let json = JSON.stringify(mensaje);
    
    let params = 'json='+ json;
    //let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };


     
    return this._http.post('http://localhost:80/api/enviar', params, httpOptions);
  }

 /*

 async enviar(mensaje){
   
  let transporter = nodemailer.createTransport({
    host: "mail.carpinteriaschmidt.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'correo@carpinteriaschmidt.com', // generated ethereal user
      pass: 'VKDHzToQOA6X' // generated ethereal password
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: 'fschmidt.10@hotmail.com', // sender address
    to: 'carpinteriaschmidt@hotmail.com', // list of receivers
    subject: "Hello", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>" // html body
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions)

  console.log("Message sent: %s", info.messageId);
  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  
 }*/
}
