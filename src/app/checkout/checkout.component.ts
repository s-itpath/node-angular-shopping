import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
// import { Observable } from 'rxjs';

import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})


export class CheckoutComponent implements OnInit{

   payPalConfig?: IPayPalConfig;

  showSuccess!:any
  cartTotal!:any
  cartItem:any
  cartData:any
  userDetail:any

  name:any
  price:any
  image:any

  constructor(private router:Router, private authService:AuthService){}

  ngOnInit(): void {
    this.initConfig()
    this.cartTotal= JSON.parse(localStorage.getItem('cart_total')as any)|| []
    console.log(this.cartTotal)
    this.cartTotal.toFixed(2)

    this.cartItem=JSON.parse(localStorage.getItem('cart_items')as any)|| []
    // const keys=Object.keys(this.cartItem)
    //  JSON.stringify(this.cartItem)
    console.log(this.cartItem)

    this.userDetail=JSON.parse(sessionStorage.getItem('auth-user')as any)|| []
    
    // console.log(this.userDetail.username)
    // for(let i=0;i<this.userDetail.length;i++){
    //   // console.log(this.cartItem[i].name)
    //   this.cartData=this.cartItem[i]
    //   // console.log(this.cartData.name)
    //   console.log(this.cartItem[i].name)
    // }
  
    // console.log(this.cartItem[0].name)
    // console.log(this.cartItem.length)
  }
  // userName:any= this.userDetail
  
  addToCartProduct():void {
    console.log(this.userDetail.username)
    for(let i=0;i< this.cartItem.length;i++){
      console.log(this.cartItem[i].name)
    
    this.authService.addToCart(this.cartItem[i].name,this.cartItem[i].price,this.cartItem[i].image,this.userDetail.username,this.userDetail.id).subscribe(
      data =>{
        // alert('product added successfully')

        // console.log(this.cartItem.name)
        // console.log(this.cartItem[0].name)
        // JSON.stringify(this.cartItem)
        // this.cartItem=data
      },
      err =>{
        console.log(err)
      }
    )
    }
    alert('product added successfully')
    localStorage.removeItem('cart_items');
  }


  backToProduct(){
    this.router.navigate(['/showproduct'])
  }
  // private initConfig():void {
    
  // }


  //for paypal payment feature
  private initConfig(): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: `${environment.Client_ID}`,
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'EUR',
                value: `${this.cartTotal}`,
                breakdown: {
                  item_total: {
                    currency_code: 'EUR',
                    value: `${this.cartTotal}`,
                  },
                },
              },
              items: [
                {
                  name: 'Enterprise Subscription',
                  quantity: '1',
                  category: 'DIGITAL_GOODS',
                  unit_amount: {
                    currency_code: 'EUR',
                    value: `${this.cartTotal}`,
                  },
                },
              ],
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (data, actions) => {
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        actions.order.get().then((details: any) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
        });
      },
      onClientAuthorization: (data) => {
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data
        );
        if (data.status === 'COMPLETED') {
          this.router.navigate(['/success']);
        }
        this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: (err) => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }




}
