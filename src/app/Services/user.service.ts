import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { UserIdentity } from '../Entities/user.interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  public getUser(id: string) {
    return this.http.get<UserIdentity>(`${environment.api}/api/user/${id}`);
  }
}
