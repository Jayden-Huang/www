import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-user-data-list',
  templateUrl: 'user-data-list.html',
})
export class UserDataListPage {
  
  type:any;
  title:string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
      this.type = this.navParams.get("type");
      switch(this.type){
        case 'question':
           this.title = "我的提问";
           break;
        case 'favourite':
           this.title = "我的关注";
           break;
        case 'answer':
           this.title = "我的回答";
           break;
      }
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserDataListPage');
  }

}
