import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Complaint } from '../Entities/complaint.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  private path: string = '/api/complaint/'

  constructor( private http: HttpClient ) { }

  public registerComplaint( data: Complaint, token: string ) {

      let headers = new HttpHeaders({
        'Authorization': `${token}`
      })

      return this.http.post( `${environment.api}${this.path}`, data, { headers } );
  }

}
