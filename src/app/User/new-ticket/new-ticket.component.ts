import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

//INTERFACES
import { CreateTicketInput } from '../../Entities/ticket.interfaces';
import { CreateBusinessUnit } from '../../Entities/businessUnits.interfaces';
import { UserIdentity } from '../../Entities/user.interfaces';

//SERVICES
import { TicketService } from '../../Services/ticket.service';
import { UserService } from '../../Services/user.service';
import { BusinessUnitService } from '../../Services/business-unit.service';

@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.css']
})

export class NewTicketComponent implements OnInit {

  idArea: string = String(localStorage.getItem('area'));
  myId: string = String(localStorage.getItem('id'));
  token: string = String(localStorage.getItem('token'));

  createInterface : CreateTicketInput = { 
    area: this.idArea,
    assignedBy: this.myId,
    backup: '',
    device: '',
    dateRequest: '',
    hour: '', 
    observation: '',
    status: 'En espera',
    tittle: '',
    type: ''  
  };

  interfaceArea: CreateBusinessUnit = {
    extensio: '',
    name: '',
    numberPhone: '',
    code: ''
  }

  interfaceIdentity: UserIdentity = {
     forename: '',
     email: '',
     role: '',
     surname: '',
     area: ''
  }


  constructor( private ticketS : TicketService, 
               private userS: UserService, 
               private areaS: BusinessUnitService,
             ) { }

  ngOnInit(): void {
    this.getAreaInfo();
    this.getUserInfo();
  }

  createTicket () {
    
    this.ticketS.registerTicker(this.createInterface, this.token).subscribe( (res:any) => {
        
        if(res.success){
            //se registro correctamente
            console.log(res)
            Swal.fire(
              '¡Registro Exitoso!',
              'El técnico aceptará tu servicio',
              'success'
            )
        
        }else {
           //no se registro correcte
           Swal.fire(
            'No se creó el ticket...',
            'Algo salió mal, intentalo de nuevo más tarde',
            'error'
          )
        }
    }, 
    err => {
      console.log(err);
    })
  }

  getUserInfo() {
      this.userS.getUser( this.myId, this.token ).subscribe( (res:any) => {
          if(res.success) this.interfaceIdentity = res.result;
          else console.log(res);
      }, 
      err => {
        console.log(err)
      });
  }

  getAreaInfo() {
      this.areaS.getArea(this.idArea, this.token).subscribe( async(res:any) => {
          if( res.success ) this.interfaceArea = await res.result;
          else console.log('error!');
      },
      err => {
        console.log(err)
      })
  }


}
