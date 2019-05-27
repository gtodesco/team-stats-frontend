import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PessoaService } from '../../services/pessoa.service';
import { EquipeService } from '../../services/equipe.service';

@Component({
  selector: 'app-equipes',
  templateUrl: './equipes.component.html',
  styleUrls: ['./equipes.component.scss']
})
export class EquipesComponent implements OnInit {

  isScrumMaster = true; // flag para testes de ScrumMaster
  nome;
  equipe;

  equipes: {};

  constructor(private route: ActivatedRoute, 
              private router: Router, 
              private pessoaService: PessoaService,
              private equipeService: EquipeService) { }

  ngOnInit() {

    this.pessoaService.getPessoaByEmail(sessionStorage.getItem("email"))
    .subscribe(
      res => {
        let pessoa = this.getOjbJSON(res);
        this.nome = pessoa.nome.split(" ", 1); // Primeiro nome apenas
        this.isScrumMaster = pessoa.scrum_Master;

        if(!this.isScrumMaster){ // Se não for Scrum Master
          this.equipe = pessoa.equipe;
        }
        else{

          this.equipeService.getEquipes().subscribe(
            res => {
              this.equipes = res;
            },
            error => console.log(error)
          );

        }

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

  addPessoa(id: any){
    sessionStorage.setItem("equipe", id);
    this.router.navigate(["/add-pessoa"]);
  }

  editEquipe(id: any){
    sessionStorage.setItem("equipe", id);
    this.router.navigate(["/cadastro-equipe"]);
  }

  removerEquipe(id: any, pessoas: any){

    for(var i=0; i <= pessoas.length - 1; i++){
      pessoas[i].equipe = null;
      this.pessoaService.putPessoa(pessoas[i]).subscribe();
    }

   this.equipeService.delete(id).subscribe();
   location.reload();
  }

}
