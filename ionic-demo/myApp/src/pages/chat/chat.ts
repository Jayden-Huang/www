import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ChatdetailsPage } from "../chatdetails/chatdetails";
@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  
  userInfo:Object;
  ChatdetailsPage:any;
  
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams) {
      this.userInfo = {
        userid: '123321',
        username: '慕女神' 
      }
      this.ChatdetailsPage = ChatdetailsPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

}
