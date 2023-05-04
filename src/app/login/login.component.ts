import { Component,OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
     form:any={
      username:null,
      password:null,
     }
     isLoggedIn=false
     isLoginFailed=false
     errorMessage=''
     roles:string[]=[]
     recaptcha:any;
     captchaVal=false
     token:string | undefined
     authError:string=''

     protected formGroup!:FormGroup 

     constructor(private authService:AuthService, private tokenStorage:TokenStorageService,
        private router:Router, private fb:FormBuilder){
          this.recaptcha=''
          this.token=undefined
          // this.isLoggedIn=false
        }

     ngOnInit(): void {
       if(this.tokenStorage.getToken()){
        this.isLoggedIn=true
        this.roles=this.tokenStorage.getUser().roles
       }
       this.captchaVal=true

      //  this.formGroup=this.fb.group({
      //   recaptcha:['',Validators.required]
      //  })
     }

    //  resolved(captchaResponse:string){
    //   this.recaptcha=captchaResponse;
    //   this.captchaVal=true
    //   console.log('resolved captcha with response'+ this.recaptcha)
    //   console.log('captcha successfully resolved')
    //  }

     onSubmit():void{
      const {username,password}=this.form;

      this.authService.login(username,password).subscribe(
        (data) =>{
          this.tokenStorage.saveToken(data.accessToken)
          this.tokenStorage.saveUser(data)

          this.isLoginFailed=false
          this.isLoggedIn=true
          this.captchaVal=true
          this.roles=this.tokenStorage.getUser().roles
          this.reloadPage()
        },
        (err) =>{
          this.errorMessage=err.error.message;
          this.isLoginFailed=true
        }
      )
      this.router.navigate(['home']) ;
      if(this.isLoginFailed==true){
        this.authError="Email or Password is not correct."
      }
      // if(this.captchaVal=false){
      //   console.log('captcha error')
      // }
      // else{
      //   console.log('captcha success')
      // }
     }

     

     reloadPage():void{
      window.location.reload()
     }
}
