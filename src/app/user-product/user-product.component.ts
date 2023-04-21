import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { DataSource } from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-product',
  templateUrl: './user-product.component.html',
  styleUrls: ['./user-product.component.css']
})
export class UserProductComponent implements OnInit{

  dataSource:any= new MatTableDataSource<any>()
  // userId!:any
  // newId:any
  constructor (private authService:AuthService, private router:Router){}
  userId=JSON.parse(sessionStorage.getItem('auth-user')as any)|| []
  newId=this.userId.id
  
  ngOnInit(): void {
    this.getCartItem()

    this.userId=JSON.parse(sessionStorage.getItem('auth-user')as any)|| []
    // console.log(this.userId.id)
    // this.newId=this.userId.id
    console.log(this.newId)
  }

  getCartItem(){
    this.authService.getUserSelectedProducts(this.newId)
    .subscribe(carItem=> this.dataSource.data= carItem)
    console.log(this.dataSource)
    console.log(this.newId)
  }


  // deleteProduct(id:number){
  //   if(confirm('are you sure you want to delete this product?')){
  //     this.authService.deleteProduct(id).subscribe(()=>{
  //       this.products= this.products.filter(product => product.id !== id)
  //     },
  //     error =>{
  //       console.log(error)
  //     })
  //   }
  // }

  deleteProduct(id:number){
    if(confirm('Are you sure you want to delete this Product from Cart?')){
      this.authService.deleteUserProduct(id).subscribe((res)=>{
        console.log(res)
      },(err)=>{
        console.log(err)
      })
      // window.location.reload()
      this.authService.reloadCurrentRoute()
    }       
  }

  // reloadCurrentRoute(){
  //   let currentUrl= this.router.url;
  //   this.router.navigateByUrl('/',{skipLocationChange:true})
  //   .then(()=>{
  //     this.router.navigate([currentUrl])
  //   })
  // }

  displayedColumns: string[]=['pName','pPrice','pImage','pLog','delItem']
  // dataSource:any= this.getCartItem()
  applyFilter(event: Event ) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  
}
