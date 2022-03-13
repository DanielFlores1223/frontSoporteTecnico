import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { UserIdentity } from '../Entities/user.interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private path: string = '/api/user';

  constructor(private http: HttpClient) { }

  @Output() getLoginInfo: EventEmitter<any>= new EventEmitter();
  @Output() changeLogin: EventEmitter<Boolean> = new EventEmitter();

  public getUser(id: string) {
    return this.http.get<UserIdentity>(`${environment.api}/api/user/${id}`);

  }

  public login( email: string, password: string ) {
    return this.http.post( `${environment.api}${this.path}/login`, { email, password } );

  }

  loginExito(){
    this.changeLogin.emit(!!localStorage.getItem('login'));
    return !!localStorage.getItem('login');
  }

}
