import { UserLogin } from './../../Entities/user.interfaces';
import { Component, OnInit } from '@angular/core';
import {UserService} from '../../Services/user.service';
import { Router } from '@angular/router'; 

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
        
        } else if( res.body.result.role === 'admin' ) {
           this.route.navigate(['/adminHome'])

        }

      }else{
        // no se hizo correctamente
      }

    },
    err => {
      console.log(err)
    } )    
  }

}
