import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import { Base } from '../../common/base';
import { UserPage } from '../user/user';
import { UserDataListPage } from '../user-data-list/user-data-list';
import { SettingProvider } from '../../providers/setting/setting';
import { ScanPage } from '../scan/scan';
import { VersionPage } from '../version/version';



@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage extends Base{

  public notLogin: boolean = true;
  public logined: boolean = false;
  
  public userInfo:string[];
  public headFace:string;
  public theme:string;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public modalController:ModalController,
              public rest:RestProvider,
              public loadingController:LoadingController,
              public storage:Storage,
              public settingProvider:SettingProvider) {
      super();
      settingProvider.getActiveTheme().subscribe(val=>this.theme=val);
  }
  
  ionViewDidLoad() {
     this.isLogin();
  }
  
  // 判断是否登录
  isLogin(){
     this.storage.get('userId').then((val) => {
       console.log(val);
        if(val != null){
            const loading = super.showLoadding(this.loadingController,"加载中...");
            //请求网络数据
            this.rest.getUserInfo(val).subscribe(
               f=>{
                  this.userInfo = f;
                  this.headFace = f["UserHeadface"]+"?"+new Date();
                  loading.dismiss();
                  this.notLogin = false;
                  this.logined = true;
               }
            );
        }else{
            this.notLogin = true;
            this.logined = false;
        }
      });

     
  }
  
  gotoDataList(type){
    this.navCtrl.push(UserDataListPage,{"type":type})
  }
 
  gotoUserPage(){
    this.navCtrl.push(UserPage);
  }

   /**
   * 跳转到扫描二维码的页面，加上 animate = false 的参数是为了
   * 相机能够在整个屏幕中显示，如果不加，相机就出不来。
   * animate 的参数默认值为 true
   * 
   * @memberof MorePage
   */
  gotoScanQRCode(){
     this.navCtrl.push(ScanPage,null,{"animate":false});
  }
  
  gotoVersions(){
    this.navCtrl.push(VersionPage);
  }
  


  showModal(){
    const modal = this.modalController.create(LoginPage);
    //关闭后的回调
    modal.onDidDismiss(()=>{
      this.isLogin();
    });
     modal.present();
  }

  toggleChangeTheme(){
     if(this.theme === "dark-theme"){
        this.theme = "light-theme";
        this.settingProvider.setActiveTheme("light-theme");
     }else{
       this.theme = "dark-theme";
       this.settingProvider.setActiveTheme("dark-theme");
     }
  }

}
