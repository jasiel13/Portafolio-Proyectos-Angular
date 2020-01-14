//importar los modulos de rutas de angular
import {ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//importamos los componentes creados
import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CreateProjectsComponent } from './components/create-projects/create-projects.component';
import { ContactComponent } from './components/contact/contact.component';
import { ErrorComponent } from './components/error/error.component';
import { DetailComponent } from './components/detail/detail.component';
import { EditComponent } from './components/edit/edit.component';

//definir las rutas
const appRoutes: Routes =[
   {path:'',component:AboutComponent},
   {path:'sobre-mi',component:AboutComponent},
   {path:'proyectos',component:ProjectsComponent},
   {path:'crear-proyectos',component:CreateProjectsComponent},
   {path:'contacto',component:ContactComponent},
   {path:'detail/:id',component:DetailComponent},
   {path:'edit/:id',component:EditComponent},
   {path:'**',component:ErrorComponent} 
];

//exportamos los modulos de angular y el approutes que contiene el array de rutas
export const AppRoutingProviders:any[]=[];
export const routing:ModuleWithProviders=RouterModule.forRoot(appRoutes);