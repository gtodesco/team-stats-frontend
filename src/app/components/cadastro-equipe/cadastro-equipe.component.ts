import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EquipeService } from '../../services/equipe.service';
import { Pessoa } from 'src/app/model/pessoa';
import { PessoaService } from '../../services/pessoa.service';

@Component({
  selector: 'app-cadastro-equipe',
  templateUrl: './cadastro-equipe.component.html',
  styleUrls: ['./cadastro-equipe.component.scss']
})
export class CadastroEquipeComponent implements OnInit{

  nome;
  pessoas = [];
  inclusaoEquipe = true;

  // Atributos chip-list
  visible = true;
  removable = true;

  form = this.fb.group({
    equipe: this.fb.group({
      nome: this.fb.control('', [Validators.required])
    })
  })

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute, 
              private router: Router,
              private equipeService: EquipeService,
              private pessoaService: PessoaService) { }

  ngOnInit(){

    if(sessionStorage.getItem("equipe") != null){
      this.equipeService.getEquipeById(parseInt(sessionStorage.getItem("equipe")))
      .subscribe(
        res => {

          this.inclusaoEquipe = false;

          // seta o nome na tela
          this.nome = this.getOjbJSON(res).nome;
          this.pessoas = this.getOjbJSON(res).pessoas;
        },
        error => console.log(error)
      );
    }

  }

  getOjbJSON(json: any){
    return JSON.parse(JSON.stringify(json));
  }

  salvar(){
    if(sessionStorage.getItem("equipe") == null){
      this.equipeService.postEquipe(this.form.value.equipe).subscribe(
        res =>{
          sessionStorage.removeItem("equipe");
          this.router.navigate(['/equipes']);
        }
      );
    }
    else{

      this.equipeService.getEquipeById(parseInt(sessionStorage.getItem("equipe")))
      .subscribe(
        res => {

          let equipe = this.getOjbJSON(res);

          equipe.nome = this.nome;
          equipe.pessoas = [];

          this.equipeService.putEquipe(equipe).subscribe(
            res => {
              
              sessionStorage.removeItem("equipe");
              this.router.navigate(['/equipes']);

            }
          );

        },
        error => console.log(error)
      );
      
    }

  }

  voltar(){
    sessionStorage.removeItem("equipe");
    this.router.navigate(["/equipes"]);
  }

  removePessoa(pessoa: Pessoa): void {

    const index = this.pessoas.indexOf(pessoa);

    if (index >= 0) {
      this.pessoas.splice(index, 1);
    }

    pessoa.equipe = null;

    this.pessoaService.putPessoa(pessoa).subscribe();

  }

  getRequiredMessage(name: string) {
    return `Você precisa digitar o ${name}`;
  }

}
