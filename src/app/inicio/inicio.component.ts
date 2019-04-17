import { Component, OnInit } from '@angular/core';
import Datos from '../../assets/datos-inicio.json';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {


  public inicio: Array<Array<String>>;

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle( "Carpinteria Schmidt" );

  	$("#inicio").css("textDecoration", "underline");

    this.inicio = [];

  	var data= JSON.stringify(Datos);

	  this.leerInicio(JSON.parse(data));
  }

  leerInicio(datos){

    var fila;

    for(let i in datos){
      fila = [datos[i].titulo, datos[i].descripcion, datos[i].imagenes];

      this.inicio.push(fila);

      
    }


    console.log(this.inicio);


    /*
  	var i, fila, columna, filaInt, imagen, imagen2, texto;
  	for(i=0; i< datos.length; i++){

      $("#container").append($("<br>"));


      fila = $("<div></div").addClass("row justify-content-center align-items-center");

      if(datos[i].imagenes.length == 1){
          imagen= $("<div></div>").addClass("col-12 col-lg-6 col-xl-4 order-12 order-lg-1").append($("<img>").attr("src", datos[i].imagenes[0]).attr("class", "img-fluid"));
          texto= $("<div></div>").addClass("col-12 col-lg-6 col-xl-4  order-lg-2 div-texto").append($("<h3></h3>").text(datos[i].titulo)).append($("<p></p>").text(datos[i].descripcion));
          fila.append(texto);
          fila.append(imagen);
          
         
      }
      else{
          texto= $("<div></div>").addClass("col-12 col-xl-8 div-texto").append($("<h3></h3>").text(datos[i].titulo)).append($("<p></p>").text(datos[i].descripcion));
          fila.append(texto);
          fila.append($("<div></div>").addClass("col-12"));
          imagen= $("<div></div>").addClass("col-12 col-lg-6 col-xl-4").append($("<img>").attr("src", datos[i].imagenes[0]).attr("class", "img-fluid"));
          imagen2= $("<div></div>").addClass("col-12 col-lg-6 mt-1 mt-lg-0 col-xl-4").append($("<img>").attr("src", datos[i].imagenes[1]).attr("class", "img-fluid"));
          fila.append(imagen);
          fila.append(imagen2);
          fila.addClass("oscura pt-4 pb-4");
      }


  		$("#container").append(fila);



  	}*/


  }

  

}

