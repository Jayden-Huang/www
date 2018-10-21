import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Base } from '../../common/base';
import { RestProvider } from '../../providers/rest/rest';

import {DeatilsPage} from "../../pages/deatils/deatils"


@IonicPage()
@Component({
  selector: 'page-discovery',
  templateUrl: 'discovery.html',
})
export class DiscoveryPage extends Base {

  questions:string[];
  errorMessage:any;

  constructor(public navCtrl: NavController, 
             public navParams: NavParams,
             public loadingCtrl: LoadingController,
             public rest: RestProvider) {

      super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DiscoveryPage');
    this.getQuestions();
  }

  getQuestions() {
    var loading = super.showLoadding(this.loadingCtrl, "加载中...");
    this.rest.getQuestionList()
      .subscribe(
      q => {
        this.questions = q;
        loading.dismiss();
      },
      error => this.errorMessage = <any>error);
  }

  doRefresh(refresher){
     this.getQuestions();
     refresher.complete();
  }
  
  gotoDetails(questionId) {
    this.navCtrl.push(DeatilsPage, { "id": questionId });
  }
}
