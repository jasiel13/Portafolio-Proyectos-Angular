import { Component, OnInit } from '@angular/core';
//importamos el modelo
import { Projects } from '../../models/projects';
//importamos el servicio project
import { ProjectService } from '../../services/project.service';
//importamos el servicio global de la url
import { Global } from '../../services/global';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers:[ProjectService]
})
export class ProjectsComponent implements OnInit {
   //creamos una variable de tipo proyecto 
   public project:Projects[];

   public url:string;

  constructor(
    private _projectService:ProjectService
  ){ 
    this.url=Global.url;
   }

  ngOnInit(){
    this.getProjects();
  }
  
  //creamos un metodo nuevo y nos subcribimos al observable para que nos devuelva un resultado de la api
  getProjects(){
    this._projectService.getProject().subscribe(
      response=>{ 
         /*la variable creada arriba "project" tiene ese nombre ya que el array que aparece en consola como respuesta
         el data que lo contiene se llama project
        console.log(response);*/       
        if(response.project){
          this.project=response.project;
        }       
      },
      error=>{
        console.log(<any>error);
      }
    );
  }
}
