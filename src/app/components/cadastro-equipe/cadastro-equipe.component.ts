import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EquipeService } from '../../services/equipe.service';

@Component({
  selector: 'app-cadastro-equipe',
  templateUrl: './cadastro-equipe.component.html',
  styleUrls: ['./cadastro-equipe.component.scss']
})
export class CadastroEquipeComponent {

  nome;

  form = this.fb.group({
    equipe: this.fb.group({
      nome: this.fb.control('', [Validators.required])
    })
  })

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute, 
              private router: Router,
              private equipeService: EquipeService) { }

  getOjbJSON(json: any){
    return JSON.parse(JSON.stringify(json));
  }

  salvar(){
    console.log("SALVOU");
    this.equipeService.postEquipe(this.form.value.equipe).subscribe();
    this.router.navigate(['/equipes']);
  }

  getRequiredMessage(name: string) {
    return `Você precisa digitar o ${name}`;
  }

}
