import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, ToastController, LoadingController } from 'ionic-angular';
import { Base } from '../../common/base';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-answer',
  templateUrl: 'answer.html',
})
export class AnswerPage extends Base{

  id:string;
  erroeMessage:any;
  content:string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl:ModalController,
              public viewCtrl:ViewController,
              public storage:Storage,
              public toastCtrl:ToastController,
              public loadingCtrl:LoadingController,
              public rest:RestProvider) {
        super();
        this.id = this.navParams.get("id");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnswerPage');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  submit(){
     this.storage.get("userId").then((val)=>{
        if(val != null){
          var loading = super.showLoadding(this.loadingCtrl,"发表中....");
          this.rest.answerQuestion(this.id,val,this.content).subscribe(f=>{
              if (f["Status"] == "OK") {
                loading.dismissAll();
                this.dismiss();
              }
              else {
                loading.dismissAll();
                super.showToast(this.toastCtrl, f["StatusContent"]);
              }
          },error=>this.erroeMessage=<any>error);
        }
     })
  }




}
