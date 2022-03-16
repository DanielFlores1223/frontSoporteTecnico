import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Ticket, CreateTicketInput, DateFilterInput } from '../Entities/ticket.interfaces';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private path: string = '/api/ticket/'

  constructor( private http: HttpClient ) { }

  public getTicketFilter(filter: string, value: (string | undefined), token: string ) {
    
    let headers = new HttpHeaders({
      'Authorization': `${token}`
    });

    return this.http.get<Ticket[]>(`${environment.api}${this.path}${filter}/${value}`, {headers});
  }

  public getTicketsByDate( data: DateFilterInput, token: string ) {
      let headers = new HttpHeaders({
        'Authorization': `${token}`
      });

      return this.http.post<Ticket[]>( `${environment.api}${this.path}filterDates`, data, { headers } );
  }

  public registerTicker( data : CreateTicketInput, token: string ) {
    
    let headers = new HttpHeaders({
      'Authorization': `${token}`
    })

    return this.http.post(`${environment.api}${this.path}`, data, { headers });
  
  }

}
