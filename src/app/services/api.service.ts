import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { userToken, registerUser, userLogins, userTodo, todoPayload } from '../models/interface';
import { environment } from '../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ApiService { 
  constructor(private http: HttpClient , private cookie : CookieService) { }


  // get the token and use it to set the header 
  getHeaders() : any  {
    // get the token first 
    const token = this.cookie.get('token'); 
    if (token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }); 
      return headers;
    }
    
  }
 
  
  // get the token 


  
 
  //register the user 
  registerUser(payload: registerUser, endpoint: string) { 
    return this.http.post(environment.BASE_URL+endpoint, payload); 
  }

  //login user 
  loginUser(endpoint : string , payload : userLogins  ) : Observable<userToken> {
    return this.http.post<userToken>(environment.BASE_URL + endpoint, payload);
  }
  //get user todos
  getUserTodos(endpoint: string): Observable<userTodo[]> {
    const header = this.getHeaders(); 
    return this.http.get<userTodo[]>(environment.BASE_URL + endpoint , {headers : header});    
  }
  // create a new todo 
  createNewTodo(endpoint: string, payload: todoPayload) {
    const headers = this.getHeaders(); 
    return this.http.post(environment.BASE_URL + endpoint, payload , { headers});
  }

  //delete an existing todo 
  deleteTodo(endpoint: string,) {
    const header = this.getHeaders();
    return this.http.delete(environment.BASE_URL + endpoint , {headers : header }); 
  }


}

