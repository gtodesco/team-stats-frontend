import { Equipe } from '../model/equipe';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EquipeService {

  private readonly URL = "http://localhost:8080/api/equipes";

  constructor(private http: HttpClient) {}

  getEquipes() {
    return this.http.get<Equipe[]>(this.URL);
  }

  getEquipeById(id: number) {
    return this.http.get(this.URL + '/' + id);
  }

  postEquipe(equipe: Equipe) {
    return this.http.post<Equipe>(this.URL, equipe);
  }

  putEquipe(equipe: Equipe){
    return this.http.put<Equipe>(this.URL, equipe);
  }

  delete(id: number) {
    return this.http.delete(this.URL + '/' + id);
  }
}