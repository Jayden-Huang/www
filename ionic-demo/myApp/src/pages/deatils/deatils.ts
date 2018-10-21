import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController,  ModalController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Base } from '../../common/base';
import { Storage } from '@ionic/storage';
import { AnswerPage } from '../answer/answer';



@IonicPage()
@Component({
  selector: 'page-deatils',
  templateUrl: 'deatils.html',
})
export class DeatilsPage extends Base{

  id:string;
  userid:string;
  question:string[];
  answer:string[];
  errorMessage:any;
  isFavarite:boolean;
  isMyQuestion:boolean;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public toastCtrl:ToastController,
              public rest:RestProvider,
              public loadingCtrl:LoadingController,
              public storage:Storage,
              public modalCtrl:ModalController) {
                super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeatilsPage');
    this.id = this.navParams.get("id");
    this.getQuestion(this.id);
  }

  getQuestion(id){
    this.storage.get("userId").then(val=>{
       if(val != null){
        this.userid = val;
        var loading = super.showLoadding(this.loadingCtrl,"加载中...");
        this.rest.getQuestion(id).subscribe(
          f=>{
            this.question = f;
            this.answer = f['Answers'];
            this.isFavarite = f["IsFavourite"];
            this.isMyQuestion = (f["OwnUserId"] == val);
            loading.dismissAll();
          },
          error=>this.errorMessage=<any>error);
       }
    })  
  }

  saveFavarite(){
    var loading = super.showLoadding(this.loadingCtrl,"加载中...");
    this.rest.getFavriteByQuestionIdAndUserId(this.id,this.userid).subscribe(
      f => {
        if (f["Status"] == "OK") {
          loading.dismiss();
          super.showToast(this.toastCtrl, this.isFavarite ? "取消关注成功" : "关注问题成功");
          this.isFavarite = !this.isFavarite;
        }
      },
      error => this.errorMessage = <any>error);
  }

  showAnswerPage(){
    var modal = this.modalCtrl.create(AnswerPage,{"id":this.id});
    //关闭后的回调
    modal.onDidDismiss(() => {
      this.getQuestion(this.id);
    });
    modal.present();
  }
}
