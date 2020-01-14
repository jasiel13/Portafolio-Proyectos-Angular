import { Component, OnInit } from '@angular/core';

//importamos el modelo de Projects
import { Projects } from '../../models/projects';

//importamos el servicio Projectservice
import { ProjectService } from '../../services/project.service';

//importamos el servicio que creamos para subir imagenes
import { UploadService } from '../../services/upload-service';

//importamos el servicio que contiene la url de la apirest para pasarselo al metodo de subir imagen
import { Global } from '../../services/global';

@Component({
  selector: 'app-create-projects',
  templateUrl: './create-projects.component.html',
  styleUrls: ['./create-projects.component.css'],
  //cargamos el objeto del servicio
  providers:[ProjectService,UploadService]
})
export class CreateProjectsComponent implements OnInit {
      //creamos una propiedad para el titulo de la seccion 
      public title:string;
      //creamos el objeto que modificara al formulario
      public project:Projects;

      //creamos una variable para un mensaje de que el proyecto se guardo correctamente
      public status:string;

      //creamos una variable para almacenar los datos de las imagenes
      public img:Array<File>;

      //guardar el proyecto en esta variable
      public proyecto_save;

  constructor(
    //propiedades del servicio nombre:tipo
    private _projectService:ProjectService,
    //propiedad el servicio para subir imagens
    private _uploadService:UploadService
  )
  {
    //darle valor a las propiedades creadas
    this.title="Crear Proyecto Nuevo";
    this.project= new Projects('','','','',2019,'','');
  }

  ngOnInit() {
  }

  onSubmit(projectForm){
    /*aqui usaremos el servicio(metodo)para guardar los proyectos,
    la propiedad ProjectService con el metodo saveproject que guardara el objeto project,
    y ademas nos subcribimos al observable*/
    this._projectService.saveProject(this.project).subscribe(
      response =>{
        if(response.project){      
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
           
            projectForm.reset();
          });     
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
