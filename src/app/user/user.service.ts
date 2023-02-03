import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {map} from "rxjs";

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
    return this.http.get<any>(apiUrl,{params:params}).pipe(map(response => response as any));
  }

  createUser(user:any) {
    return this.http.post<any>(apiUrl,user).pipe(map(response => response as any));
  }

  updateUser(data: any) {
    return this.http.patch(apiUrl,data).pipe(map(response => response as any))
  }
}
