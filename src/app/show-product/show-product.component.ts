import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent implements OnInit{
  productList!:any[];
  products:any[]=[]
  subTotal!:any;

  constructor(private productService:ProductService, private authService:AuthService, private router:Router){}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next:(res:any)=>{
        console.log(res)
        this.productList=res;
      },
      error:(error)=>{
        alert(error)
      },
      complete:()=>{
        console.log('request completed')
      }
    })

    this.productService.loadCart()
    this.products=this.productService.getProduct()
  }

  addToCart(product:any){
    if(!this.productService.productInCart(product)){
      product.quantity=1;
      this.productService.addToCart(product)
      this.products=[...this.productService.getProduct()]
      this.subTotal=product.price
    }
  }

  removeFromCart(product:any){
    this.productService.removeProduct(product)
    this.products=this.productService.getProduct()
  }

  removeAllFromCart(){
    localStorage.removeItem('cart_items')
    this.products=this.productService.getProduct()
    // window.location.reload()
    this.authService.reloadCurrentRoute()
  }

//   reloadCurrentRoute() {
//     let currentUrl = this.router.url;
//     this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
//         this.router.navigate([currentUrl]);
//     });
// }

  get total() {
    return this.products?.reduce(
      (sum, product) => ({
        quantity: 1,
        price: sum.price + product.quantity * product.price,
      }),
      { quantity: 1, price: 0 }
    ).price;
  }

  checkout(){
    localStorage.setItem('cart_total',JSON.stringify(this.total))
    this.router.navigate(['/checkout'])
  }
}
