//importamos el injectable de angular
import {Injectable} from '@angular/core';
//importamos los modulos de angular para las peticiones http
import {HttpClient, HttpHeaders} from '@angular/common/http';
//importamos el observable
import {Observable} from 'rxjs';
//importamos el modelo que creamos 
import { Projects } from '../models/projects';
//importamos la variable global de la ruta de la api
import { Global } from './global';


//creamos el decorador
@Injectable()
    export class ProjectService{
        //creamos una variable para guardar la url de la api
        public url:string;       

        constructor(
            //cargamos el httpclient como propiedad privada
            private _http: HttpClient
        )
        {
            this.url=Global.url;
        }

        testService(){
            return 'Probando el servicio';
        }

        //creamos un metodo para guardar los nuevos projectos en la BD de mongo
        saveProject(project:Projects):Observable<any>{
            //le pasamos el project como json para que la api lo pueda tomar
            let params= JSON.stringify(project);
            //establecemos las cabeceras para definir como se va enviar la informacion
            let headers = new HttpHeaders().set('Content-Type','application/json');

            /*aqui retorno el servicio de la api que voy a consumir en este caso
            pasamos la ruta de la api mas el nombre del metodo que es save-project que se creo en el backend
            tambien le pasamos la variable params y headers que acabamos de crear arriba*/
            return this._http.post(this.url+'save-project',params,{headers:headers});
        }

        //creamos un metodo para sacar los proyectos de la BD  de mongo
        getProject():Observable<any>{
             //establecemos las cabeceras para definir como se va enviar la informacion
             let headers = new HttpHeaders().set('Content-Type','application/json');
             /*aqui retorno el servicio de la api que voy a consumir en este caso
             pasamos la ruta de la api mas el nombre de la ruta list-project que se creo en el backend
             y headers que acabamos de crear arriba*/
             return this._http.get(this.url+'list-project',{headers:headers});
        }

        //metodo para sacar un solo proyecto de la BD mongo
        getOneProject(id):Observable<any>{
            //establecemos las cabeceras para definir como se va enviar la informacion
            let headers = new HttpHeaders().set('Content-Type','application/json');
            /*aqui retorno el servicio de la api que voy a consumir en este caso
             pasamos la ruta de la api mas el nombre del metodo get-project que se creo en el backend
             y headers que acabamos de crear arriba*/
            return this._http.get(this.url+'get-project/'+id,{headers:headers});
        }

        //metodo para borrar un proyecto de la BD mongo
        deleteProject(id):Observable<any>{
            //establecemos las cabeceras para definir como se va enviar la informacion
            let headers = new HttpHeaders().set('Content-Type','application/json');
             /*aqui retorno el servicio de la api que voy a consumir en este caso
             pasamos la ruta de la api mas el nombre del metodo remove-project que se creo en el backend
             y headers que acabamos de crear arriba*/
             return this._http.delete(this.url+'remove-project/'+id,{headers:headers});
        }

        //creamos un metodo para actualizar los proyectos
        updateProjects(project):Observable<any>{
              //establecemos las cabeceras para definir como se va enviar la informacion
              let headers = new HttpHeaders().set('Content-Type','application/json');

              //no solo pasamos el id sino el proyecto entero y para eso necesitamos convertirlo en un objeto json
              let params= JSON.stringify(project);

             /*aqui retorno el servicio de la api que voy a consumir en este caso
             pasamos la ruta de la api mas el nombre del metodo update-project que se creo en el backend
             y headers que acabamos de crear arriba*/
             return this._http.put(this.url+'update-project/'+project._id,params,{headers:headers});
        }
    }




