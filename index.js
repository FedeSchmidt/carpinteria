const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

// var router = express.Router();
// app.use('/sayHello', router);

//var text = 'Hello world from \n\n' + req.body.name;

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.send('Hello World!');
});

app.listen(3000, function() {
	console.log('Example app listening on port 3000!');
});

app.post('/api/enviar', function(req, res) {
	let mensaje = req.body;
	sendMail(mensaje, (info) => {
		console.log(`The mail has beed send.`);
		res.send(info);
	});
});

async function sendMail(mensaje, callback) {
	// create reusable transporter object using the default SMTP transport

	let emisor = `${mensaje.nombre} ${mensaje.apellido}`;
	let transporter = nodemailer.createTransport({
		host: 'mail.carpinteriaschmidt.com',
		port: 465,
		secure: true, // true for 465, false for other ports
		auth: {
			user: 'correo@carpinteriaschmidt.com', // Your email id
			pass: 'anselmo5821' // Your password
		}
	});

	let mailOptions = {
		from: `${emisor} <${mensaje.email}>`, // sender address
		to: 'carpinteriaschmidt@hotmail.com', // list of receivers
		subject: `Consulta Carpintería - ${emisor}`, // Subject line
		html: `<h3>Consulta de ${emisor} a través de la página web.</h3>
        <h4>Email : ${mensaje.email}</h4>
        <h4>Teléfono : ${mensaje.telefono !== '' ? mensaje.telefono : '-'}</h4>
        <h4>Consulta: </h4>
        <p>${mensaje.consulta}</p>`
	};

	// send mail with defined transport object
	let info = await transporter.sendMail(mailOptions);

	callback(info);
}
