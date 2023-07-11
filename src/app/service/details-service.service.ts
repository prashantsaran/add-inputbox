import { Injectable } from '@angular/core';
import { Details } from '../interface/details';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DetailsServiceService {

  details: Details[] = [];
  postDetails!: Observable<any>; // Change the type to Observable<any>

  constructor(private http: HttpClient) {}

  addDetails(details: Details) {
    this.details.push(details);
    console.log(details);
    this.postDetails = this.http.post('http://localhost:8080/addDetails', details, {
      observe: 'response',
      responseType: 'text'
    });
  }
}
