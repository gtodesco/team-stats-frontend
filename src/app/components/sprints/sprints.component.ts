import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PessoaService } from '../../services/pessoa.service';
import { EquipeService } from '../../services/equipe.service';
import { SprintService } from '../../services/sprint.service';

@Component({
  selector: 'app-sprints',
  templateUrl: './sprints.component.html',
  styleUrls: ['./sprints.component.scss']
})
export class SprintsComponent implements OnInit {

  isScrumMaster = true; // flag para controle se é Scrum Master
  equipe = {nome: '', pessoas:[]};
  sprints = [];
  sprintAtual;

  constructor(private route: ActivatedRoute, 
              private router: Router, 
              private pessoaService: PessoaService,
              private equipeService: EquipeService,
              private sprintService: SprintService) { }

  ngOnInit() {

    this.pessoaService.getPessoaByEmail(sessionStorage.getItem("email"))
    .subscribe(
      res => {
        let pessoa = this.getOjbJSON(res);
        this.isScrumMaster = pessoa.scrum_Master;
      },
      error => console.log(error)
    );

    this.equipeService.getEquipeById(parseInt(sessionStorage.getItem("equipe"))).subscribe(
      res => {
        
        this.equipe = this.getOjbJSON(res);
        this.sprints = this.getOjbJSON(res).sprints;

        for(var i = 0; i <= this.sprints.length -1; i++){
          this.sprints[i].pontConcluidas = Number(this.sprints[i].pontConcluidas);
          this.sprints[i].qtdDias = Number(this.sprints[i].qtdDias);
          if(this.sprints[i].finalizada == false){
            this.sprintAtual = this.sprints[i];
          }
        }

        //debugger;

      },
      error => console.log(error)
    );


  }

  criarSprint(){

    if(this.sprintAtual != null){
      alert('É necessário encerrar a sprint atual antes.');
      return;
    }

    this.router.navigate(['/cadastro-sprint']);
  }

  encerrarSprint(){
    if(this.sprintAtual == null){
      alert('É necessário criar uma sprint nova.');
      return;
    }

    let pessoas = this.equipe.pessoas;

    debugger;

    let pontConcluidas = 0;

    for(var i = 0; i <= pessoas.length -1; i++){
      pontConcluidas = pontConcluidas + Number(pessoas[i].pont_Entregue);
    }

    this.sprintAtual.pontConcluidas = pontConcluidas;
    this.sprintAtual.finalizada = true;
    this.sprintAtual.equipe = {'id': sessionStorage.getItem('equipe')};

    this.sprintService.putSprint(this.sprintAtual).subscribe(
      res => {
          
        for(var i = 0; i <= pessoas.length -1; i++){
          pessoas[i].ativ_Concluidas = 0;
          pessoas[i].pont_Entregue = 0;
          pessoas[i].equipe = {'id': sessionStorage.getItem('equipe')};
          this.pessoaService.putPessoa(pessoas[i]).subscribe();
          if(i == pessoas.length -1){
            location.reload();
          }
        }
        
      },
      error => console.log(error)
    
    );
  }

  voltar(){
    sessionStorage.removeItem("equipe");
    this.router.navigate(['/equipes']);
  }

  getOjbJSON(json: any){
    return JSON.parse(JSON.stringify(json));
  }


}
