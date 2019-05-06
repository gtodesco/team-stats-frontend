export class Pessoa {
    public id:                  number;
    public nome:                string;
    public email:               string;
    public password:            string;
    public scrum_Master:        boolean;
    public ativ_Concluidas:     string;
    public pont_Entregue:       string;
    public equipe:              Object;
  
    constructor(id: number, nome: string, email: string, password: string, scrum_Master: boolean, ativ_Concluidas: string, pont_Entregue: string, equipe: Object){
  
      this.id               = id;
      this.nome             = nome;
      this.email            = email;
      this.password         = password;  
      this.scrum_Master     = scrum_Master;  
      this.ativ_Concluidas  = ativ_Concluidas;  
      this.pont_Entregue    = pont_Entregue;  
      this.equipe           = equipe;  
    }

}  