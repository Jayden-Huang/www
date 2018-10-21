import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Events } from 'ionic-angular';


// 聊天属性信息
export class ChatMessage{

  messageId:string;
  userId:string;
  username:string;
  userImgUrl:string;
  toUserId:string;
  time:number|string;
  message:string;
  status:string;
}

// 用户信息属性
export class userInfo{
   userId:string;
   userName:string;
   userImageUrl:string;
}

@Injectable()
export class ChatserviceProvider {

  constructor(public http: Http,
              public events:Events) {
    console.log('Hello ChatserviceProvider Provider');
  }
  
  

  // 获取JSON数据
  getMessageList():Promise<ChatMessage[]>{
     const url = "../../assets/mock/msg-list.json";
     return this.http.get(url)
            .toPromise()
            .then(response => response.json().array as ChatMessage[])
            .catch(error => Promise.reject(error || '错误消息'));
  }

  sendMessage(message: ChatMessage){
    return new Promise(resolve => {
      setTimeout(()=>{
        resolve()
      },Math.random()*1000);
    }).then(()=>{
     this.mockNewMessage(message);
    })
  }

  //模拟回复消息
  mockNewMessage(message:any){
    const id = Date.now().toString();
    let messageSend: ChatMessage = {
      messageId: id,
      userId: '123321',
      username: '慕女神',
      userImgUrl: 'http://img.mukewang.com/user/57a322f00001e4ae02560256-40-40.jpg',
      toUserId: message.userId,
      time: Date.now(),
      message: '你是不是刚才给我发送了「' + message.message + '」？',
      status: 'success'
    }

    // 进行消息的广播
    setTimeout(()=>{
      this.events.publish('chat.received',messageSend,Date.now());
    },Math.random()*1000);
  }

}
