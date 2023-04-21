import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit{
    content?:string
    alluser?:string

    constructor(private userService:UserService){}

    ngOnInit(): void {
      this.userService.getAdminBoard().subscribe(
        data =>{
          this.content=data
        },
        err =>{
          this.content=JSON.parse(err.error).message
        }
      )
      this.userService.getAllUser().subscribe(
        data=>{
          this.alluser=data
        },
        err=>{
          this.alluser=JSON.parse(err.error).message
        }
      )
    }
}
