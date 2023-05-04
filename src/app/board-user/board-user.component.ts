import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { Observable } from 'rxjs';
import { Product } from '../product.model';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  currentUser:any;
  product: Product = new Product;
  id:any
  constructor(private token:TokenStorageService, private activatedRoute:ActivatedRoute,
    private authService:AuthService, private router:Router){}
  
  sub:any
  ngOnInit(): void {
    this.currentUser=this.token.getUser()
    // console.log(this.currentUser)

    this.sub=this.activatedRoute.paramMap.subscribe((params)=>{
      console.log(params)
      this.id=params.get('id')
      console.log(this.id)
      // let products:any=this.authService.getProducts()
      // this.product=products.get((p:any)=> p.id == this.id)
    })
    // this.getProductById(this.id)
  }
  // getProductById(id:any){
  //   this.authService.getProductById(id)
  //   .subscribe((res:any)=>{
  //     this.product=res;
  //   })
  // }

}
