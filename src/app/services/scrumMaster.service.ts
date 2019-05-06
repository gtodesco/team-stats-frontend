import { MatSnackBar } from '@angular/material';
import { ScrumMaster } from '../model/scrumMaster';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ScrumMasterService {

  private readonly URL = "http://localhost:8080/api/scrumMasters";

  constructor(private http: HttpClient) {}

  getScrumMasters() {
    return this.http.get<ScrumMaster[]>(this.URL);
  }

  getScrumMasterById(id: number) {
    return this.http.get(this.URL + '/' + id);
  }

  getScrumMasterByEmail(email: string) {
    return this.http.get(this.URL + '/buscar?email=' + email);
  }

  postScrumMaster(scrumMaster: ScrumMaster) {
    return this.http.post<ScrumMaster>(this.URL, scrumMaster);
  }

  putScrumMaster(scrumMaster: ScrumMaster){
    return this.http.put<ScrumMaster>(this.URL, scrumMaster);
  }

  delete(id: number) {
    return this.http.delete(this.URL + '/' + id);
  }
}