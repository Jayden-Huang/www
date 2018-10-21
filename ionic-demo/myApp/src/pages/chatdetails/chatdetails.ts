import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, TextInput, Events } from 'ionic-angular';
import { ChatMessage, ChatserviceProvider } from '../../providers/chatservice/chatservice';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-chatdetails',
  templateUrl: 'chatdetails.html',
})
export class ChatdetailsPage {
  
  userId:string;
  userName:string;
  userImgUrl:string;
  chatName:string;
  chatUserId:string;
  isOpenEmojiPicker = false;
  messageList: ChatMessage[] = [];
  errorMessage: any;
  editorMessage: string;
  @ViewChild(Content)content:Content;
  @ViewChild('chatInput')messageInput:TextInput;

  constructor(public navCtrl: NavController,
           public navParams: NavParams,
           public chatService: ChatserviceProvider,
           public storage:Storage,
           public rest:RestProvider,
           public event: Events) {
      this.chatName = navParams.get("username");
      this.chatUserId = navParams.get('userid');
  }

  ionViewDidEnter(){
   
    this.storage.get("userId").then((val)=>{
       if(val != null){
         this.rest.getUserInfo(val).subscribe(
          userinfo => {
            this.userId = '140000198202211138';
            this.userName = userinfo["UserNickName"];
            this.userImgUrl = userinfo["UserHeadface"] + "?" + (new Date()).valueOf();
       }, error => this.errorMessage = <any>error);
    }
  })

    this.getMessage().then(()=>{
      this.scrollToBottom();
    })

    // 订阅消息
    this.event.subscribe('chat.received',(msg,time)=>{
      this.messageList.push(msg);
      this.scrollToBottom();
    })
  }
   

  ionViewWillLeave() {
    //进行事件的取消订阅
    this.event.unsubscribe('chat.received');
  }

  showEmojiPicker(){
     this.isOpenEmojiPicker = !this.isOpenEmojiPicker;
  }
  

  sendMessage(){
     if(!this.editorMessage.trim()){
       return;
     }
     const id = Date.now().toString();
     let messageSend : ChatMessage= {
      messageId: id,
      userId: this.userId,
      username: this.userName,
      userImgUrl: this.userImgUrl,
      toUserId: this.chatUserId,
      time: Date.now(),
      message: this.editorMessage,
      status: 'pending'
     }
     this.messageList.push(messageSend);
     this.scrollToBottom();
     this.editorMessage = "";
     if(!this.isOpenEmojiPicker){
       this.messageInput.setFocus();
     }
     // 发送消息并改变消息的状态
     this.chatService.sendMessage(messageSend)
        .then(()=>{
          let index = this.getMessageIndex(id);
          if(index != -1){
            this.messageList[index].status = "success";
          }

        })
  }

  focus() {
    this.isOpenEmojiPicker = false;
    this.content.resize();
    this.scrollToBottom();
  }

  getMessage(){
    return this.chatService.getMessageList()
         .then(res=>{
           this.messageList = res;
         }).catch(error=>{
           console.log(error);
         })
  }

  scrollToBottom():any{
      setTimeout(()=>{
         if(this.content.scrollToBottom){
           this.content.scrollToBottom;
         }
      },400);
  }

  getMessageIndex(id:string){
    return this.messageList.findIndex(e => e.messageId === id);
  }
}
