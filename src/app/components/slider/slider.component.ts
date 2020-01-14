import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

//siempre se debe poner esto para poder usar el signo de dolar de jquery declaramos la variable global
declare var $:any;

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  /*recibimos la propiedad (anchura) que viene del componente padre, para eso creamos un decorador llamado input
  (ESTE DECORADOR ES PROPIO DE ANGULAR ASI SE DEBE DE USAR COMO INPUT NO ES SU NOMBRE PUESTO PÓR MI)*/
  @Input()anchura:number;
  @Input()etiquetas:boolean;

  //ejecutamos el decorador instanciando un nuevo metodo de tipo emmiter para crear nuevos eventos
  @Output()conseguirAutor=new EventEmitter();

  //creamos una propiedad de tipo any
  public autor:any;

  constructor(){

    //le damos valor de tipo json a la propiedad 
    this.autor={
      nombre:"Jasiel Becerra",
      website:"Reybec.com",
      youtube:"JB web"

    };
   }

  ngOnInit() {
    $("#logo").click(function(e){
      e.preventDefault();

      $("header").css("background","green")
  });

  //crear el slider
  $('.bxslider').bxSlider({
    auto:true,
    mode: 'fade',      
    responsive:true,
    speed:500,
    infiniteLoop:true,
    autoControls: true,
    stopAutoOnClick: true,
    pager: false,
    /*aqui ya usamos la propiedad(anchura)que trajimos directamente del input del componente padre*/
    slideWidth: this.anchura,
    /*aqui ya usamos la propiedad(etiquetas)que trajimos directamente del input del componente padre*/
    captions: this.etiquetas         
   });
  }

  //crear un metodo para lanzar el evento conseguirautor de tipo emmiter
  lanzar(evet){  
    //llenamos el metodo con la propiedad autor que es el objeto json  y con emit emitimos el evento
    this.conseguirAutor.emit(this.autor);
  }
}
