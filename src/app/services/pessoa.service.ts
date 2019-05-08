import { Pessoa } from '../model/pessoa';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private readonly URL = "http://localhost:8080/api/pessoas";

  constructor(private http: HttpClient) {}

  getPessoas() {
    return this.http.get<Pessoa[]>(this.URL);
  }

  getPessoaById(id: number) {
    return this.http.get(this.URL + '/' + id);
  }

  getPessoaByEmail(email: string) {
    return this.http.get(this.URL + '/buscar?email=' + email);
  }

  postPessoa(pessoa: Pessoa) {
    return this.http.post<Pessoa>(this.URL, pessoa);
  }

  putPessoa(pessoa: Pessoa){
    return this.http.put<Pessoa>(this.URL, pessoa);
  }

  delete(id: number) {
    return this.http.delete(this.URL + '/' + id);
  }
}