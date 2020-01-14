//importamos el injectable de angular
import {Injectable} from '@angular/core';
//importamos la variable global de la ruta de la api
import { Global } from './global';

//creamos el decorador
@Injectable()
    export class UploadService{
        public url:string;

        constructor(){
            this.url=Global.url;
        }

        /*creamos un metodo para hacer una peticion ajax y adjuntar un archivo para subir,
        le pasamos como parametro la url de la apirest,params de tipo string, un file , y un nombre del file*/
        makeFileRequest(url:string,params:Array<string>,files:Array<File>,name:string){
            //creamos una promesa angular
            return new Promise(function(resolve,reject){
            //creamos una especie de formulario en un objeto 
                var formData:any=new FormData();//objeto de formulario
                var xhr= new XMLHttpRequest();//objeto de peticiones asincronas

                //creamos un ciclo for para recorrer el array de archivos que puede estar llegando en las peticiones
                for(var i=0; i<files.length; i++){
                    formData.append(name,files[i],files[i].name);
                }
                //aqui hacemos la peticion ajax
                xhr.onreadystatechange = function(){
                    if(xhr.readyState==4){
                        if(xhr.status==200){
                            resolve(JSON.parse(xhr.response));
                        }
                        else{
                            reject(xhr.response);
                        }
                    }
                }
                
                xhr.open('POST',url,true);
                xhr.send(formData);
            });

        }
    }
