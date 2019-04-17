import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HostListener } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import Datos from '../../assets/datos.json';


@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css'
  ]
})
export class GaleriaComponent implements OnInit {

	public imagenes: Array<String>;
  public descripcion: Array<String>;
	id;


  constructor(private route: ActivatedRoute, private titleService: Title) { }

  ngOnInit() {

    this.titleService.setTitle( "Carpinteria Schmidt | Galeria" );

    this.route.paramMap.subscribe(params => {
     this.id = params.get("id");
    })

  	this.imagenes = [];
    this.descripcion = [];

  	var data = JSON.stringify(Datos);
  	var datos = JSON.parse(data);

    this.get_imagenes(datos, this.id);


    this.armarGrillaImagenes(this.calcularColumnas());
  	
    
  }

  calcularColumnas(){
    let ancho = screen.width;

    if(ancho > 1200)
      return 4;
    else{
      if(ancho > 992)
        return 2;
      else
        return 1;
    }
  }

  armarGrillaImagenes(columnas){


    let contenedor = $("#productos");

    let arrColumnas = [];

    for(let i = 0; i < columnas; i++){
      
      let col= $("<div></div>").addClass("contenedor").attr("id", "columna"+(i+1));
      contenedor.append(col);
      arrColumnas.push(col);
    }


    let items= this.imagenes;

    if(items.length > 0){

      /*let datos = $("<div></div>").addClass(" row datos");
      datos.append($("<h3></h3>").text(String(this.descripcion[1])));
      datos.append($("<p></p>").text(String(this.descripcion[2])));
      contenedor.append(datos);*/

      for(let m = 0 ; m < Math.ceil(items.length / columnas); m++){
        for(let n = 0; n < columnas; n++){
          let item = items[m*columnas + n];
          if(item !== undefined){
            let imagen = $("<img>").addClass("image").attr("src", String(item));

            arrColumnas[n].append(imagen);
          }
        }
      }
    }
    else{
      contenedor.append($("<p></p>").text("No disponemos de imágenes de esta galería en este momento. Te invitamos a mirar las demás galerías de productos o a ponerte en contacto con nosotros."))
    }

  }
  
  ngAfterViewInit() {




    $(".image").click(
  		function (e) {

  			var width = $(window).width();
  			
  			if(width > 991){

	    		$("#myModal").css("display","block");

	    		let src = e.target.attributes.getNamedItem("src").textContent;
	  			$("#img01").attr("src", src);

	  		}
	  		
	  });



    $(".close").click(function(){
    	$("#myModal").css("display", "none");
    });


    $("#myModal").on("click",function(e) {

    	if(!$("#btn_izquierda").is(e.target) && !$("#btn_derecha").is(e.target) && !$("#img01").is(e.target)){
			
			$("#myModal").css("display", "none");

    	}

    	
     });
  }

  get_imagenes(datos, id){
      var c, objeto, producto;
      for(let cat in Object.keys(datos)){
        c = Object.keys(datos)[cat];



        let i=0; let listo= false;


         while(i< datos[c].length && !listo){
          objeto = datos[c][i];
        
           if(objeto.id == this.id){
              this.imagenes = objeto.imagenes;
              this.descripcion = [objeto.id, objeto.titulo, objeto.descripcion];
              listo = true;
              
            }
            i++;


        }
        if(listo){break;}
    }
  }

  hallarSiguiente(){

     var src = $('#img01').attr('src');

     var siguiente;
     var i;
     var nueva;
      for(i = 0; i< this.imagenes.length; i++){
        if(this.imagenes[i]===src){
          siguiente = (i+1) % this.imagenes.length;

          nueva = this.imagenes[siguiente];
          break;
        }
      }

      $("#img01").attr("src", nueva);
  }

  hallarAnterior(){

     var src = $('#img01').attr('src');

     var anterior;
     var i;
     var nueva;
      for(i = 0; i< this.imagenes.length; i++){
        if(this.imagenes[i]===src){
          anterior = (i- 1 + this.imagenes.length) % this.imagenes.length;

          nueva = this.imagenes[anterior];
          break;
        }
      }

      $("#img01").attr("src", nueva);
  }

  @HostListener('document:keyup', ['$event'])
    handleDeleteKeyboardEvent(event: KeyboardEvent) {

      if($("#myModal").css("display") !== "none"){
        if(event.key === "ArrowRight")
          this.hallarSiguiente();
        else{
          if(event.key === "ArrowLeft")
            this.hallarAnterior();
          else{
            if(event.key === "Escape")
              $("#myModal").css("display", "none");
          }
        }
      }
  }

}

