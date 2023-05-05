import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{

  products!: any[];

  form:any={
    name:null,
    image:null,
    category:null,
    price:null,
    discount:null
  }
  isSuccessful=false
  isProductFailed=false
  errorMessage=''
  dataSource=new MatTableDataSource<any>()
  icon=faTrash
  editIcon=faEdit

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!:MatSort

  constructor(private authService:AuthService, private router:Router){}

  ngAfterViewInit(){
    this.dataSource.paginator=this.paginator
    this.dataSource.sort=this.sort
  }

  displayedColumns: string[]=['name','image','category','price','edit']
  applyFilter(event:Event){
    const filterValue=(event.target as HTMLInputElement).value;
    this.dataSource.filter= filterValue.trim().toLowerCase()
  }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList(): void {
    this.authService.getProducts()
      // .subscribe(products => this.products = products);
      .subscribe(element => this.dataSource.data = element)
  }

  deleteProduct(id:number){
    if(confirm('are you sure you want to delete this product?')){
      this.authService.deleteProduct(id).subscribe(()=>{
        // this.products= this.products.filter(product => product.id !== id)
        this.dataSource.data=this.dataSource.data.filter(product => product.id!==id)
      },
      error =>{
        console.log(error)
      })
    }
    // this.router.navigate(['product'])
    this.authService.reloadCurrentRoute();
  }


  //for refresh tha page without reloading whole page
  // reloadCurrentRoute(){
  //   let currentUrl= this.router.url;
  //   this.router.navigateByUrl('/',{skipLocationChange:true})
  //   .then(()=>{
  //     this.router.navigate([currentUrl])
  //   })
  // }

  updateProduct(product:any) {
    this.authService.updateProduct(product.id,product).subscribe((res) => {
        // console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
    product.isEdit = false;
  }

  status(item:any){
    item.isEdit = true;
  }

  onSubmit():void{
    const{name,image,category,price,discount}=this.form

    this.authService.addProduct(name,image,category,price,discount).subscribe(
      data =>{
        console.log(data)
        this.isSuccessful=true
        this.isProductFailed=false
        this.ngOnInit()
      },
      err =>{
        this.errorMessage=err.error.message
        this.isProductFailed=true
      }
    )
    // this.router.navigate(['product'])
  }

}
