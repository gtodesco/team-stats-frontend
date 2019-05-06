export class ScrumMaster {
    public id:                  number;
    public nome:                string;
    public email:               string;
    public password:            string;
  
    constructor(id: number, nome: string, email: string, password: string){
  
      this.id               = id;
      this.nome             = nome;
      this.email            = email;
      this.password         = password;
    }

}  