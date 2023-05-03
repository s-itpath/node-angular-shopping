import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

export class Message{
  constructor(public author:string, public content:string){}
}

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  getUserVal:string=this.tokenStorageService.getUser().username
  constructor( private tokenStorageService:TokenStorageService) { }

  conversation= new Subject<Message[]>()
  messageMap:any={
    "Hi":`Hello ${this.getUserVal}, welcome to shop-Kart`,
    "Hii":`Hello ${this.getUserVal}, welcome to shop-Kart`,
    "hi":`Hello ${this.getUserVal}, welcome to shop-Kart`,
    "hii":`Hello ${this.getUserVal}, welcome to shop-Kart`,
    "how are you":"I'm fine, How can i help you?",
    "who are you": "My name is Chat Bot",
    "your name": "My name is Chat Bot",
    "what is your role": "Just guide for the user",
    "defaultmsg": "I can't understand your text. Can you please repeat"
  }
  
  getBotAnswer(msg:string){
    const userMessage= new Message('user',msg)
    this.conversation.next([userMessage])
    const botMessage= new Message('bot',this.getBotMessage(msg))
    setTimeout(() => {
      this.conversation.next([botMessage])
    }, 1000);
  }

  getBotMessage(question: string ){
    let answer= this.messageMap[question]
    return answer || this.messageMap['defaultmsg']
  }
}
