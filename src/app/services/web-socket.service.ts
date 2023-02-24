import { Injectable } from '@angular/core';
import { chatMessage } from '../model/chatMessage';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  webSocket : WebSocket;
  chatMessages: chatMessage[] = [];

  constructor() { }

  public openWebSocket() {
    this.webSocket = new WebSocket('ws://localhost:8080/chat');

    this.webSocket.onopen=(event)=>{
      console.log('Open: ',event);
    };

    this.webSocket.onmessage =(event)=>{
      const chatMsg= JSON.parse(event.data);
      this.chatMessages.push(chatMsg);
    }

    this.webSocket.onclose=(event)=>{
      console.log('closed: ',event);
    };
  }

  public sendMessage(chatmsg:chatMessage){
    this.webSocket.send(JSON.stringify(chatmsg));
  }

  public closeWebSocket(){
    this.webSocket.close();
  }



}
