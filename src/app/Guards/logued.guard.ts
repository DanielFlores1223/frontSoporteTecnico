import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../Services/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoguedGuard {

  role: string = '';
  constructor( private userS : UserService, private router: Router ) {}
  
  canActivate(): boolean{
    
    if(!this.userS.loginExito()) {
      return true;
    
    } else {

        this.router.navigate(['/userHome'])
        return false;
    }
  }
  
}
