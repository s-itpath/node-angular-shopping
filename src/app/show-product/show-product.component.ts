import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent implements OnInit{
  productList!:any[];
  products:any[]=[]
  subTotal!:any;
  windowScrolled!:boolean

  constructor(private productService:ProductService, private authService:AuthService, 
    private router:Router, @Inject(DOCUMENT) private document:Document){}
  @HostListener("window:scroll",[]) 
  
  
  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.windowScrolled = true;
    } 
    else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) { 
      this.windowScrolled = false;
    }
  } 
  scrollToTop() {
    (function smoothscroll() {

      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop; 
      
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 8));
      }

    })();
  }
  
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
    console.log('hello')
    console.log(this.products)
  }
  // showProduct(id:any){
  //   console.log(id)
  //   this.router.navigate(['user'])
  // }
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
  i:any
  checkout(){
    localStorage.setItem('cart_total',JSON.stringify(this.total))
    this.router.navigate(['/checkout'])
    
    for(this.i=0;this.i<this.products.length;this.i++){
      console.log(this.products[this.i].quantity)
    }
    // console.log(this.products[0].quantity)
  }
}
