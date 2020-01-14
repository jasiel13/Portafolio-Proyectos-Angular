import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  //creamos una propiedad para pasarla al componente hijo
  public widthSlider:number;

  //propiedad para cargar slider con enter y pasarla al metodo cargarslider()
  public anchuraToSlider:number;

  //propiedad para cambiar la opcion de captions en el slider
  public captions:boolean;

  //creamos una propiedad donde almacenar el objeto json recibido
  public autor:any;

  /*usar el decorador viewchild que sirve para seleccionar elementos html en angular8 espera dos argumentos
  se pone static:true si quieres inicializarlo en ngoninit sino en flase para inicializarlo en ngAfterViewInit*/
  @ViewChild('textos', {static:true}) textos

  constructor(){
    //le damos valor 
    this.captions=true;
   }

  ngOnInit(){  
    //seleccionar un elemento html en js
    var texto = document.querySelector("#texto").innerHTML;
    alert(texto); 

    /*selecionar elementos html en angular el nativeElement
    & textContent son donde se encuentra el texto tienes que bajar hasta ellos por eso se ponen*/
    console.log(this.textos.nativeElement.textContent);
  }

  cargarSlider(){
    //le pasamos el valor de widthslider a la varibale anchuratoslider 
    this.anchuraToSlider=this.widthSlider;
  }

  resetSlider(){
    this.widthSlider=null;
    this.anchuraToSlider=null;
  }

  //ejecutar el metodo para conseguir los datos del autor
  getAutor(event){
    this.autor=event;
  }
}
