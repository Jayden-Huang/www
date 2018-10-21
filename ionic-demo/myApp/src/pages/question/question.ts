import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, Loading, LoadingController } from 'ionic-angular';
import { Base } from '../../common/base';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the QuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-question',
  templateUrl: 'question.html',
})
export class QuestionPage extends Base{

  title:string;
  content:string;
  errorMessage:any;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewCtrl:ViewController,
              public toastCtrl:ToastController,
              public rest:RestProvider,
              public storage:Storage,
              public loadingCtrl:LoadingController) {
      super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionPage');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  submitQuestion(){
    this.storage.get("userId").then(val=>{
       if(val!=null){
         let loading = super.showLoadding(this.loadingCtrl,"提交中....");
         this.rest.submitQueston(val,this.title,this.content).subscribe(f=>{
           if(f['Status']=="OK"){
              loading.dismiss();
               this.dismiss();
           }else{
             loading.dismiss();
             super.showToast(this.toastCtrl,f["StatusContent"]);
           }
         },error=>this.errorMessage=<any>error)
       }else{
          super.showToast(this.toastCtrl,"请登录....");
       }
    })
  }

}
