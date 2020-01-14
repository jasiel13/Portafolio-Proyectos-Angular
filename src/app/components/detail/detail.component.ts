import { Component, OnInit } from '@angular/core';
//importamos el modelo
import { Projects } from '../../models/projects';
//importamos el servicio project
import { ProjectService } from '../../services/project.service';
//importamos el servicio global de la url
import { Global } from '../../services/global';

//importamos estos modelos para poder utilizar sus servicios
import{Router,ActivatedRoute,Params} from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers:[ProjectService]
})
export class DetailComponent implements OnInit {
     public url:string;    
     //creamos una variable la cual contendra el modelo de objeto json de la carpeta models
     public project:Projects;

     //crear una variable para confirmacion de borrado
     public confirm:boolean;

  constructor(
    private _projectService:ProjectService,
    private _router:Router,
    private _route:ActivatedRoute
  ){
    this.url=Global.url;

    //darle valor a variable confirm
    this.confirm=false;
   }

  ngOnInit(){
    //recoger el parametro que llega por la url
    this._route.params.subscribe(params=>{
        let id=params.id;
     //ponemos el metodo que creamos abajo
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

   //metodo previo a borrar proyecto
   setConfirm(confirm){
      this.confirm=confirm;
   }
   //creamos un metodo para borrar un proyecto y le psamos un id para borrar dicho proyecto
   deleteProjects(id){
     //invocamos al metodo del servicio
     this._projectService.deleteProject(id).subscribe(
       response=>{
       //al momento de eliminar hacemos una redireccion a la pagina de proyectos
       if(response.project){
        this._router.navigate(['/proyectos']);
       }
       },
       error=>{
         console.log(<any>error);
       }
     );
   }
}
