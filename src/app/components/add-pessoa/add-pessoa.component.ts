import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PessoaService } from '../../services/pessoa.service';

@Component({
  selector: 'app-add-pessoa',
  templateUrl: './add-pessoa.component.html',
  styleUrls: ['./add-pessoa.component.scss']
})
export class AddPessoaComponent implements OnInit {

  email;

  form = this.fb.group({
    pessoa: this.fb.group({
      email: this.fb.control('', [Validators.required])
    })
  })

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute, 
              private router: Router,
              private pessoaService: PessoaService) { }

  ngOnInit() {
  }

  adicionar(){

    this.pessoaService.getPessoaByEmail(this.email)
      .subscribe(
        res => {
          
          let pessoa: any = res;

          if(pessoa == null){
            alert("Conta não cadastrada.");
            return;
          } 
          else if(pessoa.email == sessionStorage.getItem("email")){
            alert("Não é possível adicionar um e-mail igual ao seu.");
            return;
          }
          else if(pessoa.equipe != null){
            alert("Esta pessoa já está em uma equipe.");
            return;
          }

          pessoa.equipe = {"id": sessionStorage.getItem("equipe")};
          
          this.pessoaService.putPessoa(pessoa).subscribe();

          alert("Pessoa adicionada com sucesso!");

          this.router.navigate(['/equipes']);
          
        },
        error => console.log(error)
      );
  }

  voltar(){
    sessionStorage.removeItem("equipe");
    this.router.navigate(['/equipes']);
  }

  getRequiredMessage(name: string) {
    return `Você precisa digitar o ${name}`;
  }

}
