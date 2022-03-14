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

  userLogin: UserLogin = { email: '', password: ''}

  constructor( private userService: UserService, private route : Router ) { }

  ngOnInit(): void {
  }

  public login() {
    this.userService.login( this.userLogin.email, this.userLogin.password ).subscribe( (res:any) => {

      localStorage.setItem('token', res.headers.get('Authorization'));
      
      if( res.body.success ) {
        //inicio sesion correctamente
        this.userService.getLoginInfo.emit(res.body);

        if( res.body.result.role === 'employee' ) {
            this.route.navigate(['/userHome']);
            Swal.fire({
              title: 'Bienvenido!',
              text: 'Esprezza pendiente de ti',
              imageUrl: '../../../assets/Img/logo.png',
              imageWidth: 400,
              imageHeight: 200,
              imageAlt: 'Custom image',
            })
        } else if( res.body.result.role === 'admin' ) {
           this.route.navigate(['/adminHome'])

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
      console.log(err)
    } )    
  }

}
