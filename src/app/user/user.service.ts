import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";

const apiUrl = 'https://techzuapi.azurewebsites.net/api/user'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(page:number = 0,perPage:number=10){
    let params = new HttpParams()
                    .set('page',page)
                    .set('perPage',perPage);
    return this.http.get<any>(`${apiUrl}s`,{params:params})
  }

  getUserById(id:string){
    let params = new HttpParams().set('user_id',id)
    return this.http.get<any>(apiUrl,{params:params})
  }

  createUser(user:any) {
    return this.http.post<any>(apiUrl,user);
  }
}
