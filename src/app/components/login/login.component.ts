import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PessoaService } from '../../services/pessoa.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  hide      = true;
  email     = "";
  password  = "";
  
  form = this.fb.group({
    login: this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required])
    })
  });

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router,
    private pessoaService: PessoaService) { }

  fazerLogin(){    
    this.pessoaService.getPessoaByEmail(this.email)
    .subscribe(
      res => {if(res != null){
        if(this.password === JSON.parse(JSON.stringify(res)).password){
          sessionStorage.setItem("email", this.email);
          alert("logou");
          //this.router.navigate(['/cadastro']); TELA DE EQUIPES
        }else{
          alert("Password incorreto");
        }
      }else{
        alert("Conta não cadastrada");
      }},
      error => console.log(error)
    );
  }

  cadastrar(){
    sessionStorage.setItem("email", "null");
  }

  getRequiredMessage(name: string) {
    return `Você precisa digitar o ${name}`;
  }

}