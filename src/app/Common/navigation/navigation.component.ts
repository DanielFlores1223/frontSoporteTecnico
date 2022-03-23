import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  typeUser: string = String(localStorage.getItem('typeUser'));
  myId: string = String(localStorage.getItem('id'));
  token: string = String( localStorage.getItem('token') );

  constructor( private userS: UserService,
               private route : Router,) { }

  ngOnInit(): void {
    this.verifyRole();
    console.log(this.typeUser);
  }

  verifyRole() {
    this.userS.getUser( this.myId, this.token ).subscribe(
      async (res:any) => {
          const { success, result } = res;
          if ( success ) {
              
              if( this.typeUser !== result.role ) {
                  localStorage.clear();
                  
                  await Swal.fire({
                    icon: 'error',
                    title: 'Error con tus credenciales',
                    text: 'Inicie sesión de nuevo'
                  }) 

                  this.route.navigate(['/login'])
              } 

          }
      },
      err => {
        console.log(err)
      }
    )
  }

}
