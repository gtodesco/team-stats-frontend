import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PessoaService } from '../../services/pessoa.service';

@Component({
  selector: 'app-cadastro-pessoa',
  templateUrl: './cadastro-pessoa.component.html',
  styleUrls: ['./cadastro-pessoa.component.scss']
})
export class CadastroPessoaComponent implements OnInit {

  hide = true;
  nome;
  email;
  password;
  checkScrumMaster = false;

  form = this.fb.group({
    pessoa: this.fb.group({
      nome: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required]),
      scrum_Master: this.fb.control('')
    })
  })

  constructor(private fb: FormBuilder, 
              private fb2: FormBuilder, 
              private route: ActivatedRoute, 
              private router: Router,
              private pessoaService: PessoaService) { }

  ngOnInit() {
    if(sessionStorage.getItem("email") != null){ // Verifica se existe pessoa logada
      this.pessoaService.getPessoaByEmail(sessionStorage.getItem("email"))
      .subscribe(
        res => {
          let pessoa = this.getOjbJSON(res);
          this.nome = pessoa.nome;
          this.email = pessoa.email;
          this.password = pessoa.password;
          this.checkScrumMaster = pessoa.scrum_Master;
        },
        error => console.log(error)
      );
    }
  }

  getOjbJSON(json: any){
    return JSON.parse(JSON.stringify(json));
  }

  salvar(){
    if(sessionStorage.getItem("email") == null){
      this.pessoaService.postPessoa(this.form.value.pessoa).subscribe();
      this.router.navigate(['/login']);
    }else{
      this.pessoaService.getPessoaByEmail(sessionStorage.getItem("email"))
      .subscribe(
        res => {
          let novoFormulario = this.fb2.group({
            novaPessoa: this.fb2.group({
              id: JSON.parse(JSON.stringify(res)).id,
              nome: this.nome,
              email: this.email,
              password: this.password,
              scrum_Master: this.checkScrumMaster
            })
          });
          this.pessoaService.putPessoa(novoFormulario.value.novaPessoa).subscribe();  
          this.router.navigate(['/login']);
        },
        error => console.log(error)
      )
    }
  }

  getRequiredMessage(name: string) {
  return `Você precisa digitar o ${name}`;
  }

}