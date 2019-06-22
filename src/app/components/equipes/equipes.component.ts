import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PessoaService } from '../../services/pessoa.service';
import { EquipeService } from '../../services/equipe.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  pontuacao: string;
}

const ELEMENT_DATA = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-equipes',
  templateUrl: './equipes.component.html',
  styleUrls: ['./equipes.component.scss']
})
export class EquipesComponent implements OnInit {

  displayedColumns: string[] = ['name', 'actions'];
  gabriel = ELEMENT_DATA;

  isScrumMaster = true; // flag para testes de ScrumMaster
  nome;
  equipe;
  pessoa;
  pessoas;
  pontuacao: '0';

  equipes: [];

  constructor(private route: ActivatedRoute, 
              private router: Router, 
              private pessoaService: PessoaService,
              private equipeService: EquipeService,
              public dialog: MatDialog) { }

  ngOnInit() {

    this.pessoaService.getPessoaByEmail(sessionStorage.getItem("email"))
    .subscribe(
      res => {
        this.pessoa = this.getOjbJSON(res);
        this.nome = this.pessoa.nome.split(" ", 1); // Primeiro nome apenas
        this.isScrumMaster = this.pessoa.scrum_Master;

        if(!this.isScrumMaster){ // Se não for Scrum Master
          this.equipe = this.pessoa.equipe;

          this.equipeService.getEquipeById(this.equipe.id).subscribe(
            res => {
              this.pessoas = this.getOjbJSON(res).pessoas;
              for(var i = 0; i <= this.pessoas.length -1; i++){
                if(this.pessoas[i].ativ_Concluidas == null){
                  this.pessoas[i].ativ_Concluidas = 0;
                }
                if(this.pessoas[i].pont_Entregue == null){
                  this.pessoas[i].pont_Entregue = 0;
                }
              }
            },
            error => console.log(error)
          );

        }
        else{

          this.equipeService.getEquipes().subscribe(
            res => {
              this.equipes = this.getOjbJSON(res);
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

  verSprints(id: any){
    sessionStorage.setItem("equipe", id);
    this.router.navigate(["/sprints"]);
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

  concluirTarefa(): void {
    
    let temSprintAberta = false;
    let sprints = this.equipe.sprints;

    for(var i=0; i <= sprints.length -1; i++){
      if(sprints[i].finalizada == false){
        temSprintAberta = true;
        break;
      }
    }

    if(!temSprintAberta){
      alert('É necessário possuir uma sprint aberta.');
      return;
    }

    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {pontuacao: this.pontuacao}
    });

    dialogRef.afterClosed().subscribe(result => {

      this.pessoa.pont_Entregue = Number(result) + Number(this.pessoa.pont_Entregue);
      if(result > 0){
        this.pessoa.ativ_Concluidas = Number(this.pessoa.ativ_Concluidas) + 1;
      }

      this.pessoaService.putPessoa(this.pessoa).subscribe(() =>{
        location.reload();
      });
    });
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  template: `
    <h1 mat-dialog-title>Inserir pontuação</h1>
    <div mat-dialog-content>
      <mat-form-field>
        <input matInput [(ngModel)]="data.pontuacao">
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancelar</button>
      <button mat-button [mat-dialog-close]="data.pontuacao" cdkFocusInitial>OK</button>
    </div>
  `,
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
