import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { ChatbotService, Message } from '../_services/chatbot.service';



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
  constructor(private userService: UserService, private chatBot:ChatbotService) { }

  ngOnInit(): void | string {
    this.userService.getPublicContent().subscribe(
      data => {
        this.content = data
       
      },
      err => {
        this.content = JSON.parse(err.error).message
      }
      
    )

    this.chatBot.conversation.subscribe((val)=>{
      this.messages=this.messages.concat(val)
    })
  }


  sendMessage(){
    this.chatBot.getBotAnswer(this.value)
    this.value=''
  }
}
