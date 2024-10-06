import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { userToken, registerUser, userLogins } from '../models/interface';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiService { 
  constructor(private http: HttpClient) { }
  //register the user 

  registerUser(payload: registerUser, endpoint: string) { 
    return this.http.post(environment.BASE_URL+endpoint, payload); 
  }

  //login user 
  loginUser(endpoint : string , payload : userLogins  ) : Observable<userToken> {
    return this.http.post<userToken>(environment.BASE_URL + endpoint, payload);
  }
}

