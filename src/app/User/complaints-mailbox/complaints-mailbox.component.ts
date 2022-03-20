import { Component, OnInit } from '@angular/core';

//services
import { ComplaintService } from '../../Services/complaint.service';
import { UserService } from '../../Services/user.service';

//interfaces
import { CreateComplaint } from '../../Entities/complaint.interfaces';
import { UserIdentity } from '../../Entities/user.interfaces';

@Component({
  selector: 'app-complaints-mailbox',
  templateUrl: './complaints-mailbox.component.html',
  styleUrls: ['./complaints-mailbox.component.css']
})
export class ComplaintsMailboxComponent implements OnInit {

  constructor( private complaintS: ComplaintService,
               private userS: UserService ) { }

  token: string = String( localStorage.getItem('token') );
  technicanSelected: string = '';
  p: number = 1;
  search: string = '';

  createComplaint: CreateComplaint = {
    createdBy: String(localStorage.getItem('id')),
    dateIncidence: '',
    message: '',
    status: 'No leido',
    technicianId: '',
  
  }

  technicians: UserIdentity[] = [];

  ngOnInit(): void {
  }

  registerComplaint() {
    const { createdBy, dateIncidence, message, status, technicianId} = this.createComplaint;
    
    //validando
    if( [ createdBy, dateIncidence, message, status, technicianId ].includes('') ){
        //alerta error, todos los campos son obligatorios
        console.log(this.createComplaint);
        console.log('los campos son obligatorios')
        return;
    }

    this.complaintS.registerComplaint( this.createComplaint, this.token ).subscribe( 
      ( res:any ) => {
          if(res.success) {
              //se registro correctamente

          } else {
            //algo salio mal
          }
      },
      err => {
        console.log(err)
      }
     )
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

  selectTechnician( technician: UserIdentity ) {
      const { id, forename, surname } = technician;
      this.technicanSelected = `${forename} ${surname}`;
      this.createComplaint.technicianId = id;
  }

  getUserSearch() {
    if( this.search === '' ) return this.getTechnicians();

    this.userS.getUserSearch(this.search, 'technician', this.token).subscribe(
      (res:any) => {
          if ( res.success ) {
              this.technicians = res.result;
          } 
      },
      err => {
          // algo salio mal
          console.log(err);
      }
    )
      
  }

  

}
