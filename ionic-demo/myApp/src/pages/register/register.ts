import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, ViewController } from 'ionic-angular';
import { Base } from '../../common/base';
import { RestProvider } from '../../providers/rest/rest';



//@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage extends Base {

  nickname:string;
  mobile:string;
  password:string;
  comfirmPassword:string;
  errorMessage:any;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public toastCtrl:ToastController,
              public loadingCtrl:LoadingController,
              public rest:RestProvider ,
              public viewCtrl:ViewController) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  
  backToLogin(){
    this.navCtrl.pop();
  }
  register(){
    
    if(!(/^1[34578]\d{9}$/.test(this.mobile))){
        super.showToast(this.toastCtrl,"手机号码有误");
    }else if(this.nickname.length < 3 || this.nickname.length > 10){
        super.showToast(this.toastCtrl,"昵称长度在3-10位之间");
    }else if(this.password.length < 6 || this.password.length > 20){
        super.showToast(this.toastCtrl,"密码长度在6-20位之间");
    }else if(this.comfirmPassword.length < 6 || this.comfirmPassword.length > 20){
        super.showToast(this.toastCtrl,"确认密码长度在6-20位之间");
    }else if(this.password != this.comfirmPassword){
       super.showToast(this.toastCtrl,"两次密码不匹配");
    }else{
       const loading = super.showLoadding(this.loadingCtrl,"注册中");
       this.rest.register(this.nickname,this.mobile,this.password)
                .subscribe(f=>{
                  if(f['Status'] == 'OK'){
                    loading.dismiss();
                     super.showToast(this.toastCtrl,"注册成功");
                     this.dismiss();
                  }else{
                    loading.dismiss();
                    super.showToast(this.toastCtrl, f["StatusContent"]);
                  }
                },
                error => this.errorMessage = <any>error);

    }
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }
}
