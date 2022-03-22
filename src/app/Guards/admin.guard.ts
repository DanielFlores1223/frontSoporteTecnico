import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../Services/user.service';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard {
  constructor( private userS : UserService, private router: Router ) {}
  role: string = '';

  canActivate(): boolean{

    this.role = String(localStorage.getItem('typeUser'));

    if( this.role !== 'admin' ) {
      
      this.router.navigate(['/userHome']);
      
      return false;
    }
    
    return true;
  }
  
}
