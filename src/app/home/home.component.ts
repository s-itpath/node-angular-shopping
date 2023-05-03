import { Component, OnInit, HostListener } from '@angular/core';
import { UserService } from '../_services/user.service';
import { ChatbotService, Message } from '../_services/chatbot.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { ProductService } from '../_services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  content?: string
  messages: Message[]=[];
  value!: string;
  show=true;
  isLoggedIn=false
  windowScrolled!:boolean
  productList!:any[]
  private roles:string[]=[]

  constructor(private userService: UserService, private chatBot:ChatbotService,
    private tokenStorageService:TokenStorageService, private productService:ProductService,
    private router:Router) { }
    @HostListener("window:scroll",[])

    onWindowScroll(){
      if(window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop >100){
        this.windowScrolled=true;
      }
      else if(this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop <10){
        this.windowScrolled=false;
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

  ngOnInit(): void | string {
    this.isLoggedIn=!!this.tokenStorageService.getToken()

    if(this.isLoggedIn){
      const user=this.tokenStorageService.getUser()
      this.roles=user.roles
    }
    this.userService.getPublicContent().subscribe(
      data => {
        // this.content = data
      },
      err => {
        this.content = JSON.parse(err.error).message
      }
      
    )

    this.chatBot.conversation.subscribe((val)=>{
      this.messages=this.messages.concat(val)
    })


    this.productService.getAllProducts().subscribe({
      next:(res:any)=>{
        console.log(res)
        this.productList=res
      },
      error:(error)=>{
        alert(error)
      },
      complete:()=>{
        console.log('process completed')
      }
    })
  }
  goToPage(){
    this.router.navigate(['showproduct'])
  }

  sendMessage(){
    this.chatBot.getBotAnswer(this.value)
    this.value=''
  }
}
