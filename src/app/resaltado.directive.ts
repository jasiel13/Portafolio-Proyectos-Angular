import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appResaltado]'
})
export class ResaltadoDirective {

  constructor(
    /*aqui estamos aplicando una directiva personalizada usamos el metodo (ElementRef) propio de angular
    con esto seleccionamos un elemento especifico html y se selecciona de manera nativa
    usando su propiedad nativeElement*/
    public el:ElementRef
  ){ }
  
  ngOnInit(){
    /*aqui usamos a la porpiedad el que contiene el element ref le pasamos el nativeelement y luego cambiamos las 
    propiedades del elemento html como su background,etc*/
    var elemento=this.el.nativeElement;
    elemento.style.background="#C884D9";
    elemento.style.padding="20px";  
    elemento.style.color="white"; 
    elemento.style.fontSize="25px";
  }
}
