import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { CadastroPessoaComponent } from './components/cadastro-pessoa/cadastro-pessoa.component';
import { EquipesComponent } from './components/equipes/equipes.component';
import { CadastroEquipeComponent } from './components/cadastro-equipe/cadastro-equipe.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro-pessoa', component: CadastroPessoaComponent },
  { path: 'equipes', component: EquipesComponent },
  { path: 'cadastro-equipe', component: CadastroEquipeComponent },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
