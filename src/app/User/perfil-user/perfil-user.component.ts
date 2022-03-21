import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { BusinessUnitService } from '../../Services/business-unit.service';
import Swal from 'sweetalert2';
import { UserIdentity } from '../../Entities/user.interfaces';
import { BusinessUnit } from '../../Entities/businessUnits.interfaces';

@Component({
  selector: 'app-perfil-user',
  templateUrl: './perfil-user.component.html',
  styleUrls: ['./perfil-user.component.css']
})
export class PerfilUserComponent implements OnInit {

  myId: string = String(localStorage.getItem('id'));
  token: string = String(localStorage.getItem('token'));
  myInfo: UserIdentity = { email: '', forename: '', id: '', role: '', surname: '', area: '' }
  area: BusinessUnit = { _id: '', code: '', extension: '', name: '', numberPhone: '' }
  areas: BusinessUnit[] = [];

  constructor( private userS: UserService,
               private businessS: BusinessUnitService ) { }

  ngOnInit(): void {
    this.getMyInfo();
    this.getAreas();
  }

  getMyInfo() {
    this.userS.getUser(this.myId, this.token ).subscribe( 
      (res:any) => {
          console.log(res);
          const { success, result } = res;

          if ( success ) {
            this.myInfo = result;

            if( this.myInfo.area )
                this.getInfoArea( this.myInfo.area );

            else {
              Swal.fire({
                icon: 'error',
                title: 'algo salió mal',
                text: 'Reinténtalo más tarde!'
              })
            }

          }else {
            //algo salio mal
            Swal.fire({
              icon: 'error',
              title: 'Algo salió mal',
              text: 'Reinténtalo más tarde!'
            })
          }
          
      },
      err => {
        //algo salio mal
        console.log(err);
      }
     )
  }

  getInfoArea( idArea: string ) {
      
     if(idArea){
        this.businessS.getArea( idArea, this.token ).subscribe(
          (res: any) => {
              const { success, result } = res;

              if ( success ) {
                  this.area = result;
              
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Error de área',
                  text: 'Algo salió mal, verifica los datos!'
                })
              }
          }, 
          err => {
            //algo salio mal
            console.log(err);
          }
        )
     
    } else {
       //hubo un error con el area
     }
      
  }

  getAreas() {
    this.businessS.getAreas(this.token).subscribe(
      (res: any) => {
        const { success, result } = res;

        if ( success ) {
            this.areas = result;

        } else { 
          //algo salio mal
        }
      }, 
      err => {
        // algo salio mal
        console.log(err);
      }
    )
  }

  updatePerfil() {
    this.userS.updateUser( this.myId, this.myInfo, this.token ).subscribe(
      (res: any) => {
          const { success, result } = res;

          if (success) {
              // se actualizaron los datos correctamente
              Swal.fire({
                icon: 'success',
                title: 'Actuaslización exitosa!',
                text: 'Los datos se actualizaron correctamente',
              })
              console.log('los datos se actualizaron')
          } else {
            //los datos no se actualizaron
            Swal.fire({
              icon: 'error',
              title: 'Algo salió mal',
              text: 'Los datos no se actualizaron correctamente',
            })
            console.log('Los datos no se actualizaron correctamente');
          }
      },
      err => {
        //algo salio mal
        console.log(err);
      }
    )

  }

}
