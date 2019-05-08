export class Equipe {
    public id:      number;
    public nome:    string;
    public pessoas: Array<Object>;
    public sprints: Array<Object>;
  
    constructor(id: number, nome: string, pessoas: Array<Object>, sprints: Array<Object>){
 
        this.id       = id;
        this.nome     = nome;
        this.pessoas  = pessoas;
        this.sprints  = sprints;  
    }

}  