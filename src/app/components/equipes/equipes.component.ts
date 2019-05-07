import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-equipes',
  templateUrl: './equipes.component.html',
  styleUrls: ['./equipes.component.scss']
})
export class EquipesComponent implements OnInit {

  equipes: string[] = ['Fênix', 'Monster', 'Transformers', 'CuboD4', 'Anônima'];


  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  editarPerfil(){
    this.router.navigate(["/cadastro-pessoa"]);
  }

  sair(){
    sessionStorage.removeItem("email");
    this.router.navigate(["/login"]);
  }

}
