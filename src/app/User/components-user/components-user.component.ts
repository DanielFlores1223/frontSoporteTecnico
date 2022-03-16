import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../Services/ticket.service';
import { UserService } from '../../Services/user.service';
import { UserIdentity } from '../../Entities/user.interfaces';
import { Ticket, DateFilterInput } from '../../Entities/ticket.interfaces';

@Component({
  selector: 'app-components-user',
  templateUrl: './components-user.component.html',
  styleUrls: ['./components-user.component.css']
})
export class ComponentsUserComponent implements OnInit {

  myId: string = String(localStorage.getItem('id'));
  token: string = String(localStorage.getItem('token'));
  myTickets: Ticket[] = [];
  existeAsignacion: boolean = false;
  ticketInfo: Ticket = {
    _id: '',
    area: '',
    assignedBy: '',
    backup: '',
    dateRequest: '',
    device: '',
    hour: '',
    observation: '',
    status: '',
    tittle: '',
    type: '',
    assignedTo: '',
    evaluation: ''
  }

  tecnicoInfo: UserIdentity = {
    email: '',
    forename: '',
    role: '',
    surname: '',
    area: ''
  }

  dateFilter: DateFilterInput = {
    endDate: '',
    startDate: ''
  }

  constructor( private ticketS : TicketService, 
               private userS: UserService 
             ) { }

  ngOnInit(): void {
    this.getMyTickets();
  }

  getMyTickets() {
    this.ticketS.getTicketFilter( 'assignedBy', this.myId, this.token ).subscribe( 
      ( res: any ) => {
         
        if (res.success) {
          this.myTickets = res.result;
          console.log(this.myTickets)
        }

      },
      err => {
        console.log(err);
      }
     )

  }

  getAllInfo( idTicket: (string | undefined) ) {
      this.ticketS.getTicketFilter('_id', idTicket, this.token).subscribe( (res:any) => {
          if(res.success) {
              //Obteniendo información del ticket
              this.ticketInfo = res.result[0];
              
              if( this.ticketInfo.assignedTo && this.ticketInfo.assignedTo !== '' ){
                  this.existeAsignacion = true;
                  this.userS.getUser(res.result.assignedTo, this.token).subscribe( (res:any) => {
                      if(res.success) {
                        //Obteniendo información del tecnico
                        this.tecnicoInfo = res.result;
                      }
                    },
                  err => {
                    //mensaje de error
                  } );
              
              } else {
                this.existeAsignacion = false;
              }  
          }
      },
      err => {
        //mensaje de error
      } );

  }


  getTicketsByDates() {
    const { startDate, endDate } = this.dateFilter;
      
      if ( [startDate, endDate].includes('') ) {
          //si está vacio aqui debe mostrar un error
          //Este mensaje deberia mostrarse en el DOM
          console.log('Los campos de la fecha son obligatorios');

          return;
      }

      this.ticketS.getTicketsByDate( this.dateFilter, this.token ).subscribe(
        (res: any) => {
            
            if( res.success ) {
              this.myTickets = res.result;
            
            } else {
              //Hubo algun error en la petición
            }

        },
        err => {
            //Algo salio mal...
            console.log(err);
        }
      )
  }


}
