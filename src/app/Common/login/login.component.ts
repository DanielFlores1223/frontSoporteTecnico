import { UserLogin } from './../../Entities/user.interfaces';
import { Component, OnInit } from '@angular/core';
import {UserService} from '../../Services/user.service';
import { Router } from '@angular/router'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;

  userLogin: UserLogin = { email: '', password: ''}

  constructor( private userService: UserService, private route : Router ) { }

  ngOnInit(): void {
  }

  public login() {
    const { email, password } = this.userLogin;
    if( [email, password].includes('') ){
      Swal.fire({
        icon: 'error',
        title: 'Algo salió mal',
        text: 'Ambos campos son obligatorios'
      });

      return;
    } 

    this.userService.login( this.userLogin.email, this.userLogin.password ).subscribe( (res:any) => {

      localStorage.setItem('token', res.headers.get('Authorization'));
      
      if( res.body.success ) {
        //inicio sesion correctamente
        this.userService.getLoginInfo.emit(res.body);

        if( res.body.result.role === 'employee' ) {
            this.route.navigate(['/userHome']);
            Swal.fire({
              title: '¡Bienvenido!',
              text: 'Esprezza pendiente de ti',
              imageUrl: '../../../assets/Img/logo.png',
              imageWidth: 400,
              imageHeight: 200,
              imageAlt: 'Custom image',
            })
        } else if( res.body.result.role === 'admin' ) {
           this.route.navigate(['/adminHome'])
           Swal.fire({
            title: '¡Bienvenido!',
            text: 'Esprezza pendiente de ti',
            imageUrl: '../../../assets/Img/logo.png',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
          })
        }

      }else{
        // no se hizo correctamente
        Swal.fire({
          icon: 'error',
          title: 'Algo salió mal',
          text: 'Debes estar registrado para acceder'
        })
      }

    },
    err => {
      Swal.fire({
        icon: 'error',
        title: 'Algo salió mal',
        text: 'Debes estar registrado para acceder'
      })
    } )    
  }

}
