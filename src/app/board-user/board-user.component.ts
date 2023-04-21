import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  currentUser:any;

  constructor(private token:TokenStorageService){}

  ngOnInit(): void {
    this.currentUser=this.token.getUser()
    // console.log(this.currentUser)
  }

}
