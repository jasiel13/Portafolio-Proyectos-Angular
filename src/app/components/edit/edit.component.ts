import { Component, OnInit } from '@angular/core';

//importamos el modelo de Projects
import { Projects } from '../../models/projects';

//importamos el servicio Projectservice
import { ProjectService } from '../../services/project.service';

//importamos el servicio que creamos para subir imagenes
import { UploadService } from '../../services/upload-service';

//importamos el servicio que contiene la url de la apirest para pasarselo al metodo de subir imagen
import { Global } from '../../services/global';

//importamos estos modelos para poder utilizar sus servicios
import{Router,ActivatedRoute,Params} from '@angular/router';


@Component({
  selector: 'app-edit',
  //reutilizamos la vista que carga el formulario
  templateUrl: '../create-projects/create-projects.component.html',
  styleUrls: ['./edit.component.css'],
  providers:[ProjectService,UploadService]
})
export class EditComponent implements OnInit {
  public title:string;
  public url:string;
  public project:Projects;

 //creamos una variable para un mensaje de que el proyecto se guardo correctamente
  public status:string;

  //creamos una variable para almacenar los datos de las imagenes
  public img:Array<File>;

  //guardar el proyecto en esta variable
  public proyecto_save;

  constructor(
    private _projectService:ProjectService,
    private _uploadService:UploadService,

    private _router:Router,
    private _route:ActivatedRoute
  ){
    this.title="Modificar Proyecto";
    this.url=Global.url;
   }

   /*copiamos este elemento de detail.component para reutilizar el codigo y asi obtener el objeto del proyecto para rellenar 
   automaticamente el formulario*/
   ngOnInit(){
    //recoger el parametro que llega por la url en este caso el id
    this._route.params.subscribe(params=>{
        let id=params.id;
     //ejecutamos el metodo que creamos abajo
        this.getOneProjects(id);
    });
  }
  
  //creamos un metodo para mostrar los detalles de cada proyecto y le pasamos un id para buscar dicho proyecto
  getOneProjects(id){
  //utilizamos el servicio project.service.ts el cual contiene el metodo getOneProject
      this._projectService.getOneProject(id).subscribe(
        response=>{
          if(response.project){
            //utilizamos la variable creada arriba llamada project
            this.project=response.project;
          }         
        },
        error=>{
          console.log(<any>error);
        }
      );
   }

   //metodo para enviar el formulario
   onSubmit(){
     this._projectService.updateProjects(this.project).subscribe(
      //copiamos la ejecucion que usamos en create-projects
      response =>{
        if(response.project){            
       
         if(this.img){
          /*1-aqui subimos la imagen en el formulario
          2-seleccionamos el servicio y el metodo utilizado que retorna una promesa
          3-le pasamos como parametros la url de la apirest, la ruta donde almacena las imagenes la api
          4-le pasamos la respuesto de la api y el id del project 
          5-le pasamos la variable del evento filechangeevent
          6-le pasamos el nombre de la variable que almacena las imagenes en el json del proyecto
          7-metimos el status-response de guardar el formulario que indica success y el reseteo del formulario*/
          this._uploadService.makeFileRequest(Global.url+"upload-project/"+response.project._id,[],this.img,"image")
          .then((result:any)=>{
            this.proyecto_save=result.project;
            this.status='success';          
           });  
          }  
          else{
            this.proyecto_save=response.project;
            this.status='success';  
          }
        }
        
        else{
          this.status='failed';
        }
      },
      error=>{
        console.log(<any>error);
      }
     );
   }

   fileChangeEvent(fileInput:any){
    //castemos el array lo forzamos a que sea un tipo file, fileInput es lo que capturo el evento
    this.img=<Array<File>>fileInput.target.files;
  }
}
