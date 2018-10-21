import { Component } from '@angular/core';
import {  NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import {Base} from '../../common/base'
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { RegisterPage } from '../register/register';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends Base{

  mobile:any;
  password:any;
  errorMessage:any

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewCtrl:ViewController,
              public loaddingCtrl:LoadingController,
              public toastCtrl:ToastController,
              public rest:RestProvider,
              public storage:Storage) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
     var loading = super.showLoadding(this.loaddingCtrl,"登录中");
     this.rest.login(this.mobile,this.password)
              .subscribe(f=>{
                if(f['Status'] == 'OK'){
                  this.storage.set("userId",f['UserId']);
                  loading.dismiss();
                  this.dismiss();
                }else{
                  loading.dismiss();
                   super.showToast(this.toastCtrl,f['StatusContent']);
                }
              },
              error => this.errorMessage = <any>error);
  }

  dismiss(){
    console.log("///");
    this.viewCtrl.dismiss();
  }

  pushToRegister(){
    this.navCtrl.push(RegisterPage);
  }

}
