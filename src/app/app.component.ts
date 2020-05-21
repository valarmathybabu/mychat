import { Component } from '@angular/core';
import {MessageService} from './message.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'mychat';
  message='';
  chats =[];
  user;
  username;
  constructor(private messageService : MessageService){

    this.messageService.getChats().subscribe((data)=>{
      this.chats = data;
      window.setTimeout(()=>{
        const ele = document.getElementById('scrolldiv');
      ele.scrollTop=ele.scrollHeight;
        },50);
    });
  }
  addChat(){
    if (this.message!='')
    {
      this.messageService.addChat(this.message)
      this.message=''
    }
    return;

  }
  addUser(user)
  {
    this.messageService.addUser(user);
    this.username=user;
  }
}
