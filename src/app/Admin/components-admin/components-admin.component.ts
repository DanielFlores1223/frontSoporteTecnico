import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import Swal from 'sweetalert2';

// services
import { UserService } from '../../Services/user.service';
import { ComplaintService } from '../../Services/complaint.service';
import { TicketService } from '../../Services/ticket.service';

// interfaces
import { UserIdentity, UserIdentityCountTickets } from '../../Entities/user.interfaces';
import { Complaint } from '../../Entities/complaint.interfaces';

@Component({
  selector: 'app-components-admin',
  templateUrl: './components-admin.component.html',
  styleUrls: ['./components-admin.component.css']
})
export class ComponentsAdminComponent implements OnInit {
  
  constructor( private userS: UserService,
               private complaintS: ComplaintService,
               private route : Router,
               private ticketS: TicketService ) { }

  token: string = String( localStorage.getItem('token') );
  p: number = 1;
  pTabla: number = 1;
  search: string = '';
  technicians: UserIdentityCountTickets[] = [];
  complaints: Complaint[] = [];
  techNotifications: UserIdentity [] = [];
  technicianModal: UserIdentity = { email: '',forename:'',id: '', role: '', surname: '', area: '' }
  complaintsModal: Complaint[] = [];
  btnVerTodos: boolean = false;
  
  ngOnInit(): void {
    this.getTechnicians();
    this.getNotifications();
  }

  getTechnicians() {

    this.userS.getUserRole( 'technician', this.token ).subscribe(
      ( res: any ) => {
        if( res.success ) {
          this.technicians = res.result;
          this.getTicketsByTechnicians(this.technicians, 0);

        } else {
          //hubo algun error
          
        }
      },
      err => {
        console.log('getTechnicians');
        console.log(err);

        /*Swal.fire({
          icon: 'error',
          title: 'Algo salió mal',
          text: 'Por favor intentalo más tarde'
        })*/
      }
    )
  }


  getTicketsByTechnicians( t: UserIdentityCountTickets[], i: number ) {

      t.forEach( tech => {
          this.ticketS.getTicketFilter('assignedTo', tech.id, this.token ).subscribe(
            (res: any) => {
              if (res.success) {
            
                this.technicians.forEach( t2 => {
                    if (t2.id == tech.id) {
                      t2.count = res.count;
                    }
                } )

              
              }
            },
            err => {
              console.log(err);
            }
          )
      } )

      console.log('desde aqui')
      console.log(this.technicians);

  }

  getNotifications() {
      this.complaintS.getComplaintFilter('status', 'No leido', this.token).subscribe(
        (res:any) => {
          const { success, result } = res;
           
          if ( success ) {
              this.getTechnicianWithComplaints( result );
           }
        },
        err => {
          console.log('getNotifications()');
          console.log(err)
          /*Swal.fire({
            icon: 'error',
            title: 'Algo salió mal',
            text: 'Por favor intentalo más tarde'
          })*/
        }
      )
  }

  getTechnicianWithComplaints( complaints: Complaint[] ) {
      let techniciansId: string[] = [];

      complaints.forEach( (c) => {

        if( !techniciansId.includes( c.technicianId ) ) {
            techniciansId.push( c.technicianId );
  
        }

      } );

      this.getDataTechnicianComplaint( techniciansId );
  }

  getDataTechnicianComplaint( idTechnician: string[] ) {
      this.techNotifications = [];
      idTechnician.forEach( (t) => {
   
          this.userS.getUser( t, this.token ).subscribe(
            (res: any) =>{
                const { success, result} = res;
                if ( success ) {
                    const { email, forename, surname, role, area } = result;

                   this.techNotifications.push( 
                     { 
                       id: t,
                       email,
                       forename,
                       surname,
                       role,
                       area
                     });
                }
              
            },
            err => {
              //console.log('getDataTechnicianComplaint')
              //console.log(err);
              /*Swal.fire({
                icon: 'error',
                title: 'Algo salió mal',
                text: 'Por favor intentalo más tarde'
              })*/
            }
          )
      

      } );

  }

  getTechnicianById( id: string ) {
      this.userS.getUser( id, this.token ).subscribe(
        (res: any) => {
            const { success, result } = res;

            if (success) {
              let t: UserIdentity[] = [];
              t.push(result);
              this.technicians = t;
            }
        },
        err => {
          console.log('getTechnicianById');
          console.log(err)
          /*Swal.fire({
            icon: 'error',
            title: 'Algo salió mal',
            text: 'Por favor intentalo más tarde'
          })*/
        }
      )
  }

  getComplaintsNoRead( tech: UserIdentity ) {
      this.btnVerTodos = false;
      this.complaintsModal = [];

      this.complaintS.getComplaintTechAndStatus( tech.id, 'No leido', this.token ).subscribe(
        (res:any) => {
            const { success, result } = res;

            if (success) {
                this.technicianModal = tech;
                this.complaintsModal = result;
            
            }else{
              //algo salio mal
              console.log('getComplaintsNoRead')
              console.log(res)
              /*Swal.fire({
                icon: 'error',
                title: 'Algo salió mal...',
                text: 'Pr favor inténtalo más tarde'
              })*/
            }
        },
        err => {
          console.log('getComplaintsNoRead err')
              console.log(err)
          /*Swal.fire({
            icon: 'error',
            title: 'Algo salió mal',
            text: 'Por favor intentalo más tarde'
          })*/
        }
      )
  
  }

  getComplaintsByIdTech(idT: string, tech?: UserIdentity) {

    this.btnVerTodos = true;
    this.complaintsModal = [];

      this.complaintS.getComplaintFilter('technicianId', idT, this.token).subscribe(
        (res: any) => {
            const { success, result } = res;
            if (success) {
               if( tech ) this.technicianModal = tech;
               this.complaintsModal = result; 

            }else{
              //algo salio mal
              Swal.fire({
                icon: 'error',
                title: 'Algo salió mal...',
                text: 'Por favor inténtalo más tarde'
              })
            }
        },
        err => {
          Swal.fire({
            icon: 'error',
            title: 'Algo salió mal...',
            text: 'Por favor inténtalo más tarde'
          })
        }
      )
  }

  updateStatusComplaint() {

    this.complaintsModal.forEach( c => {
      this.complaintS.updateStatus( c._id, 'leido', this.token ).subscribe(
        (res: any)=> {
          const { success, result } = res;
          if(!success) {
           
            Swal.fire({
              icon: 'error',
              title: 'Algo salió mal...',
              text: 'Por favor inténtalo más tarde'
            });
          }
        },
        err => {
          //algo salio mal
          Swal.fire({
            icon: 'error',
            title: 'Algo salió mal',
            text: 'Por favor inténtalo más tarde'
          })
        }
      )
    } );

    this.getNotifications()
    
  }

  getUserSearch() {
    if( this.search === '' ) return this.getTechnicians();

    this.userS.getUserSearch(this.search, 'technician', this.token).subscribe(
      (res:any) => {
          if ( res.success ) {
              this.technicians = res.result;
              this.getTicketsByTechnicians(this.technicians, 0)
          } 
      },
      err => {
          // algo salio mal
          Swal.fire({
            icon: 'error',
            title: 'Algo salió mal',
            text: 'Por favor inténtalo más tarde'
          })
      }
    )
      
  }

}

