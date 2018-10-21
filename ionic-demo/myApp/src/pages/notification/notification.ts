import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, Loading } from 'ionic-angular';
import { Base } from '../../common/base';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { DeatilsPage } from '../deatils/deatils';


@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage extends Base{

  notificationList:string[];
  errorMessage:any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public rest:RestProvider,
              public loading:LoadingController,
              public toast:ToastController,
              public storage:Storage) {
        super();
  }

  ionViewDidLoad() {
     this.storage.get('userId').then((val)=>{
         if(val != null){
            // 加载用户数据
            var loading = super.showLoadding(this.loading,"加载中....");
            this.rest.getNotificationByUserId(val).subscribe(
              n=>{
                 this.notificationList = n;
                 loading.dismissAll();
              },error=>this.errorMessage = <any>error);
         }
     })
  }
  

  goDetails(questionId){
    this.navCtrl.push(DeatilsPage,{id:questionId});
  }
}
