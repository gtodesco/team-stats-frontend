export class Sprint {
    public id:                    number;
    public numero:                string;
    public pontPlanejada:         string;
    public pontUltimaSprint:      string;
    public pontConcluidas:        boolean;
    public pontNaoTerminadas:     string;
    public pontPlus:              string;
    public pontInterrupcoes:      string;
    public qtdDias:               string;
    public finalizada:            boolean;
    public equipe:                Object;
  
    constructor(id: number, numero: string, pontPlanejada: string, pontUltimaSprint: string, pontConcluidas: boolean, pontNaoTerminadas: string, pontPlus: string, 
                pontInterrupcoes: string, qtdDias: string, finalizada: boolean,equipe: Object){
  
      this.id =                    id               
      this.numero =                numero           
      this.pontPlanejada =         pontPlanejada    
      this.pontUltimaSprint =      pontUltimaSprint 
      this.pontConcluidas =        pontConcluidas   
      this.pontNaoTerminadas =     pontNaoTerminadas
      this.pontPlus =              pontPlus
      this.pontInterrupcoes =      pontInterrupcoes
      this.qtdDias =               qtdDias
      this.finalizada =            finalizada
      this.equipe =                equipe
    }

}  