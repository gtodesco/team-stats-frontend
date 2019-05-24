export class Equipe {
    public id:      number;
    public nome:    string;
    public pessoas: Array<any>;
    public sprints: Array<any>;
  
    constructor(id: number, nome: string, pessoas: Array<any>, sprints: Array<any>){
 
        this.id       = id;
        this.nome     = nome;
        this.pessoas  = pessoas;
        this.sprints  = sprints;  
    }

}  