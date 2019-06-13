import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 


import { LoginComponent } from './components/login/login.component';
import { CadastroPessoaComponent } from './components/cadastro-pessoa/cadastro-pessoa.component';
import { EquipesComponent } from './components/equipes/equipes.component';
import { CadastroEquipeComponent } from './components/cadastro-equipe/cadastro-equipe.component';
import { AddPessoaComponent } from './components/add-pessoa/add-pessoa.component';
import { SprintsComponent } from './components/sprints/sprints.component';
import { DialogOverviewExampleDialog } from './components/equipes/equipes.component';

@NgModule({
  declarations: [ // Components
    AppComponent,
    LoginComponent,
    CadastroPessoaComponent,
    EquipesComponent,
    CadastroEquipeComponent,
    AddPessoaComponent,
    SprintsComponent,
    DialogOverviewExampleDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    AppRoutingModule
  ],
  entryComponents: [DialogOverviewExampleDialog],
  bootstrap: [AppComponent]
})
export class AppModule { }
