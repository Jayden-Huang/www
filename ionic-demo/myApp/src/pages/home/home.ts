import { Component } from '@angular/core';
import { NavController, ModalController, Tabs, LoadingController, ToastController } from 'ionic-angular';
import { QuestionPage } from '../question/question';
import { Base } from '../../common/base';
import { RestProvider } from '../../providers/rest/rest';
import { DeatilsPage } from '../deatils/deatils';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends Base{

  feeds:string[];
  errorMessage:any;

  constructor(public navCtrl: NavController,
              public model:ModalController,
              public loadingCtrl:LoadingController,
              public toastCtrl:ToastController,
              public rest:RestProvider) {
      super();
  }

  ionViewDidLoad(){
     this.getFeeds();
  }
  
  gotoQuestion(){
     console.log("sdd");
     var model = this.model.create(QuestionPage);
     model.present();
  }

  gotoChat(){
     this.selectTab(2);
  }

  selectTab(index:number){
    var tab:Tabs = this.navCtrl.parent;
    tab.select(index);
  }

  getFeeds(){
    var loading = super.showLoadding(this.loadingCtrl,"加载中....");
    this.rest.getFeeds().subscribe(f=>{
       this.feeds = f;
       loading.dismiss();
    },error=>this.errorMessage = <any>error);
  }

  gotoDetails(questionId){
    this.navCtrl.push(DeatilsPage,{id:questionId})
  }
}
