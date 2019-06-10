import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PessoaService } from '../../services/pessoa.service';
import { EquipeService } from '../../services/equipe.service';

@Component({
  selector: 'app-sprints',
  templateUrl: './sprints.component.html',
  styleUrls: ['./sprints.component.scss']
})
export class SprintsComponent implements OnInit {

  isScrumMaster = true; // flag para controle se é Scrum Master
  equipe = {};
  sprints = [];

  constructor(private route: ActivatedRoute, 
              private router: Router, 
              private pessoaService: PessoaService,
              private equipeService: EquipeService) { }

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
          this.sprints[i].pontConcluidas = parseFloat(this.sprints[i].pontConcluidas);
          this.sprints[i].qtdDias = parseFloat(this.sprints[i].qtdDias);
        }

        debugger;

      },
      error => console.log(error)
    );


  }

  getOjbJSON(json: any){
    return JSON.parse(JSON.stringify(json));
  }


}
