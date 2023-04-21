import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const API_URL='http://localhost:8080/api/test'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getPublicContent():Observable<any>{
    return this.http.get(API_URL + 'all',{responseType:'text'})
  }

  getUserBoard():Observable<any>{
    return this.http.get(API_URL + 'user',{responseType:'text'})
  }
  getAllUser():Observable<any>{
    return this.http.get(API_URL + 'alluser',{responseType:'text'})
  }

  getAdminBoard():Observable<any>{
    return this.http.get(API_URL+ 'admin',{responseType:'text'})
  }

  // getModeratorBoard():Observable<any>{
  //   return this.http.get(API_URL + 'moderator',{responseType:'text'})
  // }
}
