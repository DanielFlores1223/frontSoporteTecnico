import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import { UserService } from '../../Services/user.service';
import { BusinessUnit } from '../../Entities/businessUnits.interfaces';
import { BusinessUnitService } from '../../Services/business-unit.service';
import { CreateUser } from '../../Entities/user.interfaces';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  hide = true;

  securePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/
  diacriticPhrase = /^[A-Za-zÀ-ÖØ-öø-įĴ-őŔ-žǍ-ǰǴ-ǵǸ-țȞ-ȟȤ-ȳɃɆ-ɏḀ-ẞƀ-ƓƗ-ƚƝ-ơƤ-ƥƫ-ưƲ-ƶẠ-ỿ]+( [A-Za-zÀ-ÖØ-öø-įĴ-őŔ-žǍ-ǰǴ-ǵǸ-țȞ-ȟȤ-ȳɃɆ-ɏḀ-ẞƀ-ƓƗ-ƚƝ-ơƤ-ƥƫ-ưƲ-ƶẠ-ỿ]+)+$/

  employee: CreateUser = {
    email: '',
    forename: '',
    password: '',
    role: 'employee',
    surname: '',
    area: ''
  }
  
  areas: BusinessUnit[] = [];

  constructor( private userS: UserService,
               private route : Router,
               private businessS: BusinessUnitService,
                ) { }

  ngOnInit(): void {
    this.getAreas();
  }

  validateForm(): Boolean {
    const { email, forename, password, role, surname, area } = this.employee;
 
    if( [email, forename, password, role, surname, area].includes('') ) {
      Swal.fire({
        icon: 'error',
        title: 'Todos los campos son obligatorios',
        text: 'Revisa que hayas ingresado todos los datos que se te solicitan'
      });
      return false;
    }

    if( !this.diacriticPhrase.test(this.employee.forename) || !this.diacriticPhrase.test(this.employee.surname) ) {
      Swal.fire({
        icon: 'error',
        title: 'Error en el formato',
        text: 'Revisa el formato de tu nombre y apellidos'
      });

      return false;
    }

    if ( !this.securePassword.test(this.employee.password) ) {
      Swal.fire({
        icon: 'error',
        title: 'Error en el formato',
        text: 'La contraseña debe tener 8 caracteres, 1 numero, 1 una letra mayúscula y 1 carácter especial'
      });

      return false;
    }

    return true;

  }
  getAreas() {

    this.businessS.getAreas('').subscribe(
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
  registerEmployee() {

    if ( this.validateForm() ) {

      this.userS.registerEmployee( this.employee ).subscribe(
        async (res: any) => {
            const { success, result } = res;
  
            if( success ) {
              
              await Swal.fire({
                title: '¡Tu registro ha sido exitoso!',
                text: 'Ye puedes iniciar sesión',
                icon: 'success',
              });

              this.route.navigate(['/login']);
            }
  
        },
        err => {  
            console.log(err);
        }
      );
    }
    
  }

}
