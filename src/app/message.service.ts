import {Injectable} from '@angular/core'
import * as io from 'socket.io-client'
import {Subject} from 'rxjs'


@Injectable(
    {providedIn:"root"}
)
export class MessageService{
    socket;
    _chats=[];
    _chatsub;
    constructor(){
        this._chatsub = new Subject<any[]>();

        this.socket = io.connect();

       this.socket.on('connect',()=>{
           console.log('connected to server')
       });
      
       this.socket.on('message received',(data)=>{
        this._chats.push(data);
        this._chatsub.next([...this._chats]);
        
       });

       this.socket.on('allmessages',(data)=>{
           this._chats=[...data];
           this._chatsub.next([...this._chats]);
           console.log('all messages')
       });

       this.socket.on('user connected', (data) => {
        this._chats.push({message: `${data} connected`, type: 'notify'});
        this._chatsub.next([...this._chats]);        

      });
      this.socket.on('user disconnected', (data) => {
        this._chats.push({message: `${data} disconnected`, type: 'notify'});
        this._chatsub.next([...this._chats]);
      });

    }
    addChat(message)
    {
        this.socket.emit('newmessage',message);
    }

    addUser(user)
    {
    this.socket.emit('new user',user)
    }

    getChats()
    {
        return this._chatsub.asObservable();
    }
}