import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { CadastroPessoaComponent } from './components/cadastro-pessoa/cadastro-pessoa.component';
import { EquipesComponent } from './components/equipes/equipes.component';
import { CadastroEquipeComponent } from './components/cadastro-equipe/cadastro-equipe.component';
import { AddPessoaComponent } from './components/add-pessoa/add-pessoa.component';
import { SprintsComponent } from './components/sprints/sprints.component';
import { CadastroSprintComponent } from './components/cadastro-sprint/cadastro-sprint.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro-pessoa', component: CadastroPessoaComponent },
  { path: 'equipes', component: EquipesComponent },
  { path: 'cadastro-equipe', component: CadastroEquipeComponent },
  { path: 'add-pessoa', component: AddPessoaComponent },
  { path: 'sprints', component: SprintsComponent },
  { path: 'cadastro-sprint', component: CadastroSprintComponent },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
