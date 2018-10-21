import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, ToastController, ViewController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Base } from '../../common/base';
import { Storage } from '@ionic/storage';
import { HeadfacePage } from '../headface/headface';


//@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage extends Base{

  nickName:string = "加载中....";
  headFace:string = "http://img.mukewang.com/user/57a322f00001e4ae02560256-40-40.jpg?";
  errorMessage:any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public modalController:ModalController,
              public rest:RestProvider,
              public loadingController:LoadingController,
              public toastCtrl:ToastController,
              public viewCtrl:ViewController,
              public storage:Storage) {
      super();
  }

  ionViewDidEnter() {
    this.loadUserPage();
  }

  loadUserPage() {
    this.storage.get('userId').then((val) => {
      if (val != null) {
        //加载用户数据
        var loading = super.showLoadding(this.loadingController, "加载中...");
        this.rest.getUserInfo(val)
          .subscribe(
          userinfo => {
            this.nickName = userinfo["UserNickName"];
            this.headFace = userinfo["UserHeadface"] + "?" + (new Date()).valueOf();
            loading.dismiss();
          },
          error => this.errorMessage = <any>error);
      }
    });
  }

  /**
   * 根据用户ID，修改
   */
  saveNickName(){
      //从本地存储拿到id
      this.storage.get('userId').then((val) => {
        if (val != null) {
          var loading = super.showLoadding(this.loadingController, "修改中...");
          this.rest.updateNickName(val, this.nickName)
            .subscribe(
            f => {
              if (f["Status"] == "OK") {
                loading.dismiss();
                super.showToast(this.toastCtrl,"修改成功");
              }
              else {
                loading.dismiss();
                super.showToast(this.toastCtrl, f["StatusContent"]);
              }
            },
            error => this.errorMessage = <any>error);
        }
      });
  }

  logout(){
    this.storage.remove("userId");
    this.viewCtrl.dismiss();
  }

  updateHeadFace(){
    this.navCtrl.push(HeadfacePage);
  }

}
