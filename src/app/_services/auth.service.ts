import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

const AUTH_API= 'http://localhost:8080/api/auth/'

const httpOptions={
  headers:new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private serverUrl

  constructor(private http:HttpClient, private router:Router) { }

  login(username:string, password:string): Observable<any>{
    return this.http.post(AUTH_API +'signin',{
      username,
      password
    },httpOptions);
  }

  register(username:string,email:string,password:string):Observable<any>{
    return this.http.post(AUTH_API+ 'signup',{
      username,
      email,
      password
    },httpOptions)
  }

  addProduct(name:string,image:string,category:string,price:string,discount:string):Observable<any>{
    return this.http.post(AUTH_API + 'product',{
      name,
      image,
      category,
      price,
      discount
    },httpOptions)
  }

  addToCart(name:string,price:string,image:string,username:string,uid:string):Observable<any>{
    return this.http.post(AUTH_API + 'addtocart',{
      name,
      price,
      image,
      username,
      uid
    },httpOptions)
  }

  // getCartItem(){
  //   return this.http.get<any[]>(AUTH_API + 'addtocart');
  // }
  getCartItem(){
    return this.http.get<any[]>(AUTH_API + 'addtocart');
  }

  deleteProduct(id:number):Observable<void>{
    return this.http.delete<void>(`${AUTH_API + 'product'}/${id}`);
  }

  deleteUserProduct(id:number):Observable<void>{
    return this.http.delete<void>(`${AUTH_API + 'deluserproduct'}/${id}`)
  }
  

  updateProduct(id:number, data:string):Observable<any>{
    return this.http.put(AUTH_API + 'editproduct/'+ id,data)
  }

  // getAllProduct():Observable<any>{
  //   return this.http.get(AUTH_API + 'product',{responseType:'text'})
  // }

  getProducts() {
    return this.http.get<any[]>(AUTH_API + 'product');
  }

  showaAllUser(){
    return this.http.get<any[]>(AUTH_API + 'alluser');
  }

  getUserSelectedProducts(id:any){
    return this.http.get<any[]>(AUTH_API +'userpro/'+ id)
  }
  // getUserSelectedProducts(id:number){
  //   return this.http.get<any[]>(`${AUTH_API + 'userpro'}/${id}`);
  // }

  // getProducts():Observable<any[]>{
  //   return this.http.get<any[]>(`${this.AUTH_API}`)
  // }


  //for refresh data without reload the whole page
  reloadCurrentRoute(){
    let currentUrl= this.router.url;
    this.router.navigateByUrl('/',{skipLocationChange:true})
    .then(()=>{
      this.router.navigate([currentUrl])
    })
  }

}
