import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

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
  isSignUpFailed=false
  errorMessage=''

  constructor(private authService:AuthService, private router:Router){}

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList(): void {
    this.authService.getProducts()
      .subscribe(products => this.products = products);
  }

  deleteProduct(id:number){
    if(confirm('are you sure you want to delete this product?')){
      this.authService.deleteProduct(id).subscribe(()=>{
        this.products= this.products.filter(product => product.id !== id)
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
        this.isSignUpFailed=false
        this.ngOnInit()
      },
      err =>{
        this.errorMessage=err.error.message
        this.isSignUpFailed=true
      }
    )
    // this.router.navigate(['product'])
  }

}
