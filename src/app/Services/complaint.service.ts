import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Complaint, CreateComplaint } from '../Entities/complaint.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  private path: string = '/api/complaint/'

  constructor( private http: HttpClient ) { }

  public registerComplaint( data: CreateComplaint, token: string ) {

      let headers = new HttpHeaders({
        'Authorization': `${token}`
      })

      return this.http.post( `${environment.api}${this.path}`, data, { headers } );
  }

  public getComplaintFilter( filter: string, value: string, token: string ) {
    let headers = new HttpHeaders({
      'Authorization': `${token}`
    })

    return this.http.get(`${environment.api}${this.path}${filter}/${value}`, { headers });
  }

  public getComplaintTechAndStatus( idTechnican: string, status: string, token: string ) {
    let headers = new HttpHeaders({
      'Authorization': `${token}`
    })

    return this.http.get(`${environment.api}${this.path}technicianAndStatus/${idTechnican}/${status}`, { headers });
  }

  public updateStatus( idComplaint: string, status: string, token: string ) {
      let headers = new HttpHeaders({
        'Authorization': `${token}`
      });

      return this.http.put(`${environment.api}${this.path}${idComplaint}`, { status }, { headers } );
  }
}
