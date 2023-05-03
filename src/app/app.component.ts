import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { ThemeService } from './theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title:string='app component'
    private roles:string[]=[]
    isLoggedIn=false
    showAdminBoard=false
    // showModeratorBoard=false
    username?:string
    checkbox=document.querySelector('#checkbox')

    constructor(private tokenStorageService:TokenStorageService,
      private themeService:ThemeService){}
    
    ngOnInit(): void {
      this.isLoggedIn=!!this.tokenStorageService.getToken()
      this.checkbox?.addEventListener("change",()=>{
        document.body.classList.toggle("dark")
      })
      if(this.isLoggedIn){
        const user=this.tokenStorageService.getUser()
        this.roles=user.roles;

        this.showAdminBoard=this.roles.includes('ROLE_ADMIN')
        // this.showModeratorBoard=this.roles.includes('ROLE_MODERATOR')

        this.username=user.username
      }
    }


    toggle() {
      const active = this.themeService.getActiveTheme() ;
      if (active.name === 'light') {
        this.themeService.setTheme('dark');
      } else {
        this.themeService.setTheme('light');
      }
    }

    logout():void{
      this.tokenStorageService.signOut()
      window.location.reload()
      localStorage.removeItem('cart_total');
      localStorage.removeItem('cart_items');
    }
}
