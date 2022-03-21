import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
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

  public getUser(id: string, token: string) {

    let headers = new HttpHeaders({
      'Authorization': `${token}`
    })

    return this.http.get<UserIdentity>(`${environment.api}/api/user/${id}`, { headers });

  }

  public getUserRole(role: string, token: string) {

    let headers = new HttpHeaders({
      'Authorization': `${token}`
    })

    return this.http.get<UserIdentity>(`${environment.api}/api/users/`, { headers, params: { role } });

  }

  public getUserSearch(search: string, role: string, token: string) {

    let headers = new HttpHeaders({
      'Authorization': `${token}`
    })

    return this.http.get<UserIdentity>(`${environment.api}/api/users/`, { headers, params: { search, role } });

  }

  public login( email: string, password: string) {

    return this.http.post( `${environment.api}${this.path}/login`, { email, password }, { observe: 'response'} );

  }

  loginExito(){
    this.changeLogin.emit(!!localStorage.getItem('login'));
    return !!localStorage.getItem('login');
  }

  public updateUser( id: string, data: UserIdentity, token: string ) {
    let headers = new HttpHeaders({
      'Authorization': `${token}`
    });

    return this.http.put(`${environment.api}${this.path}/${id}`, data, { headers });

  }

}
