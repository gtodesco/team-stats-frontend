import { Sprint } from '../model/sprint';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  private readonly URL = "http://localhost:8080/api/sprints";

  constructor(private http: HttpClient) {}

  getSprints() {
    return this.http.get<Sprint[]>(this.URL);
  }

  getSprintById(id: number) {
    return this.http.get(this.URL + '/' + id);
  }

  postSprint(sprint: Sprint) {
    return this.http.post<Sprint>(this.URL, sprint);
  }

  putSprint(sprint: Sprint){
    return this.http.put<Sprint>(this.URL, sprint);
  }

  delete(id: number) {
    return this.http.delete(this.URL + '/' + id);
  }
}