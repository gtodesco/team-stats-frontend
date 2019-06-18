import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SprintService } from '../../services/sprint.service';

@Component({
  selector: 'app-cadastro-sprint',
  templateUrl: './cadastro-sprint.component.html',
  styleUrls: ['./cadastro-sprint.component.scss']
})
export class CadastroSprintComponent implements OnInit {

  form = this.fb.group({
    sprint: this.fb.group({
      numero: this.fb.control('', [Validators.required]),
      pontPlanejada: this.fb.control('', [Validators.required]),
      qtdDias: this.fb.control('', [Validators.required]),
      finalizada: false,
      equipe: {'id': sessionStorage.getItem('equipe')}
    })
  })

  constructor(private fb: FormBuilder, 
              private route: ActivatedRoute, 
              private router: Router,
              private sprintService: SprintService) { }

  ngOnInit() {
  }

  getOjbJSON(json: any){
    return JSON.parse(JSON.stringify(json));
  }

  cadastrar(){
    this.sprintService.postSprint(this.form.value.sprint).subscribe(
      res => {
        this.router.navigate(['/sprints']);    
      },
      error => console.log(error)
    );
  }

  getRequiredMessage(name: string) {
  return `Você precisa digitar o ${name}`;
  }

}