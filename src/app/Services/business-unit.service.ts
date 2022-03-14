import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusinessUnitService {

  private path: string = '/api/businessunit';

  constructor( private http: HttpClient ) { }

  getArea( id: string ) {
    return this.http.get<any>(`${environment.api}${this.path}/${id}`);

  }


}
