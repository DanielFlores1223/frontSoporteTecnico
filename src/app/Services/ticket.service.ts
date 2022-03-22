import { Observable } from 'rxjs';
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

  public searchTicket( assignedBy: string, tittle: string, token: string ) {
    let headers = new HttpHeaders({
      'Authorization': `${token}`
    })

    return this.http.post(`${environment.api}${this.path}regexTittle`, { assignedBy, tittle }, { headers });

  }

  public getReportByUserMonth( assignedTo: string, year: string, token: string ) {
    let headers = new HttpHeaders({
      'Authorization': `${token}`
    });

    return this.http.post(`${environment.api}${this.path}reportByTechMonths`, { assignedTo, year }, { headers });
  }

  public getXSLXByUserMonth( assignedTo: string, year: string, token: string ) {

    //`${environment.api}${this.path}reportByTechMonths?format=xlsx`
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/vnd.openxmlformats');
    //FileSaver saveAs(Blob/File/Url, optional DOMString filename, optional Object { autoBom })
  /*return this.http.post(`${environment.api}${this.path}reportByTechMonths?format=xlsx`, {assignedTo, year}, { headers: headers, responseType: ResponseContentType.Blob })
    .subscribe((res: any) => {
      let blob = new Blob([res._body], { type: 'application/vnd.openxmlformats' });
        let myUrl = document.createElement('a');
        myUrl.href = window.URL.createObjectURL(blob);
        myUrl.download = 'Log.xlsx';
        let event = document.createEvent('MouseEvent');
        event.initEvent('click', true, true);
        myUrl.dispatchEvent(event);
    });*/

  }

}
