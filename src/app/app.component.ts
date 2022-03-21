import { Component } from '@angular/core';
import { UserService } from './Services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'frontSoporteTecnico';

  constructor( private userService: UserService ) {}

  dataLogin: any;
  loginStatus: boolean = false;
  typeUser: string = '';
  nombre: string = '';

  ngOnInit(): void {

    this.getDataLogin();

    this.userService.changeLogin.subscribe( isOpen => {
      this.loginStatus = Boolean(isOpen);
    } );

    this.loginStatus = this.userService.loginExito();
    this.typeUser = String(localStorage.getItem('typeUser'));
    this.nombre = String(localStorage.getItem('nombre'));
  }

  getDataLogin() {
    this.userService.getLoginInfo.subscribe( async res => {
      this.dataLogin = await res;
      localStorage.setItem('login', this.dataLogin.success );
      localStorage.setItem('id', this.dataLogin.result.id);
      localStorage.setItem('typeUser', this.dataLogin.result.role);
      localStorage.setItem('area', this.dataLogin.result.area);
      localStorage.setItem('nombre', this.dataLogin.result.forename);
     
      this.nombre = String(localStorage.getItem('nombre'));
      this.loginStatus = this.userService.loginExito();
      this.typeUser = String(localStorage.getItem('typeUser'));
    },
    err => {
      console.log(err)
    })
  }

}


