import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusinessUnitService {

  private path: string = '/api/businessunit';

  constructor( private http: HttpClient ) { }

  getArea( id: string, token: string ) {

    let headers = new HttpHeaders({
      'Authorization': `${token}`
    })

    return this.http.get<any>(`${environment.api}${this.path}/${id}`, { headers });

  }


}
