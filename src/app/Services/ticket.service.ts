import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CreateTicketInput } from '../Entities/ticket.interfaces';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private path: string = '/api/ticket/'

  constructor( private http: HttpClient ) { }

  public registerTicker( data : CreateTicketInput ) {
    return this.http.post(`${environment.api}${this.path}`, data);
  
  }

}
