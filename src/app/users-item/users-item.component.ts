import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { DataSource } from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';


@Component({
  selector: 'app-users-item',
  templateUrl: './users-item.component.html',
  styleUrls: ['./users-item.component.css']
})
export class UsersItemComponent implements OnInit{
  cartItem!:any[]
  dataSource= new MatTableDataSource<any>()
  userId!:number 
  userDetail!:any 
  cartTotal!:any

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort ;

  constructor(private authService:AuthService){}


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  //to implement material ui sorting featuer name of displayedColumns
  // and element.value should be same otherwise it won't work.
  displayedColumns: string[]=['id','username','uid','name','price','createdAt','pImage']
  // dataSource:any= this.getCartItem()
  applyFilter(event: Event ) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    // this.getCartItem()
    this.getCartItem2()

    // this.userDetail=JSON.parse(sessionStorage.getItem('auth-user')as any)|| []
    // console.log(this.userDetail)

    // this.cartTotal=JSON.parse(sessionStorage.getItem('auth-user')as any)|| []
    // console.log(this.cartTotal.id)

   
  }

  // getCartItem():void{
  //   this.authService.getCartItem()
  //     .subscribe(cartItem => this.cartItem =cartItem)
  //     console.log(this.cartItem)

  // }
  getCartItem2():void{
    this.authService.getCartItem()
      .subscribe(cartItem => this.dataSource.data =cartItem)
      // console.log(this.dataSource)

  }

  // deleteProduct(id:number){
  //   if(confirm('are you sure you want to delete this product?')){
  //     this.authService.deleteProduct(id).subscribe(()=>{
  //       this.cartItem= this.cartItem.filter((product: { id: number; }) => product.id !== id)
  //     },
  //     error =>{
  //       console.log(error)
  //     })
  //   }
  // }


  

  // i:any
  // increseNo(){
    
  //   for(this.i=1;this.i<this.dataSource.data.length;this.i++){
  //     console.log(this.i)
  //     console.log('hii')
  //   }
  // }
  

}
