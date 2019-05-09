import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PessoaService } from '../../services/pessoa.service';

@Component({
  selector: 'app-equipes',
  templateUrl: './equipes.component.html',
  styleUrls: ['./equipes.component.scss']
})
export class EquipesComponent implements OnInit {

  isScrumMaster = true; // flag para testes de ScrumMaster
  nome;
  equipe;

  equipes: string[] = ['Fênix', 'Monster', 'Transformers', 'CuboD4', 'Anônima'];

  constructor(private route: ActivatedRoute, 
              private router: Router, 
              private pessoaService: PessoaService) { }

  ngOnInit() {

    this.pessoaService.getPessoaByEmail(sessionStorage.getItem("email"))
    .subscribe(
      res=>{
        let pessoa = this.getOjbJSON(res);
        this.nome = pessoa.nome.split(" ", 1); // Primeiro nome apenas
        this.isScrumMaster = pessoa.scrum_Master;

        if(!this.isScrumMaster){ // Se não for Scrum Master
          this.equipe = pessoa.equipe;
        }

        console.log(res);
      },
      error => console.log(error)
    );
    
  }

  getOjbJSON(json: any){
    return JSON.parse(JSON.stringify(json));
  }

  criarEquipe(){
    this.router.navigate(["/cadastro-equipe"]);
  }

  editarPerfil(){
    this.router.navigate(["/cadastro-pessoa"]);
  }

  sair(){
    sessionStorage.removeItem("email");
    this.router.navigate(["/login"]);
  }

}
