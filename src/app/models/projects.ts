//creamos un modelo con una clase llamada projects
export class Projects{
    constructor(
        public _id:string,
        public name:string,
        public description:string,
        public category:string,
        public year:number,
        public langs:string,
        public image:string
    ){
      


    }
}