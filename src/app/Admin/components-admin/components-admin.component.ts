import { Component, OnInit } from '@angular/core';

// services
import { UserService } from '../../Services/user.service';
import { ComplaintService } from '../../Services/complaint.service';

// interfaces
import { UserIdentity } from '../../Entities/user.interfaces';
import { Complaint, ComplaintViewTechnician } from '../../Entities/complaint.interfaces';
import { NotificationComplaint } from '../../Entities/notification.interface';

@Component({
  selector: 'app-components-admin',
  templateUrl: './components-admin.component.html',
  styleUrls: ['./components-admin.component.css']
})
export class ComponentsAdminComponent implements OnInit {
  
  constructor( private userS: UserService,
               private complaintS: ComplaintService ) { }

  token: string = String( localStorage.getItem('token') );
  p: number = 1;
  pTabla: number = 1;
  search: string = '';
  technicians: UserIdentity[] = [];
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
        } else {
          //hubo algun error
          console.log('todo bien');
        }
      },
      err => {
        console.log(err)
      }
    )
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
              console.log(err);
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
            console.log(err);
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
            }
        },
        err => {
          console.log(err);
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

            }
        },
        err => {
          //algo salio mal
          console.log(err);
        }
      )
  }

  updateStatusComplaint() {

    this.complaintsModal.forEach( c => {
      this.complaintS.updateStatus( c._id, 'leido', this.token ).subscribe(
        (res: any)=> {
          const { success, result } = res;
          if(success) {
             console.log('actualizado correctamente')
          }
          else{
            //algo salio mal
          }
        },
        err => {
          //algo salio mal
          console.log(err);
        }
      )
    } );

    this.getNotifications()
    
  }

}

