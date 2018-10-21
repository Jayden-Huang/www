import { Component,Input } from '@angular/core';
import {  NavController, NavParams, LoadingController, ToastController, Loading } from 'ionic-angular';
import { Base } from '../../common/base';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { DeatilsPage } from '../../pages/deatils/deatils';

@Component({
  selector: 'question-compnent',
  templateUrl: 'question-compnent.html'
})
export class QuestionCompnentComponent extends Base{

  questionList:string[];
  errorMessage:any;
 
  @Input('datatype') dataSourceType;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public rest:RestProvider,
              public loading:LoadingController,
              public toast:ToastController,
              public storage:Storage) {
        super();
  }

  ngAfterContentInit(){
    this.storage.get('userId').then((val) => {
      if (val != null) {
        //加载用户数据
        var loading = super.showLoadding(this.loading, "加载中...");
        this.rest.getUserQuestionList(val,this.dataSourceType)
          .subscribe(
          q => {
            this.questionList = q;
            loading.dismissAll();
          },
          error => this.errorMessage = <any>error);
      }
    });
  }

  gotoDetails(questionId) {
    this.navCtrl.push(DeatilsPage, {"id": questionId });
  }

}
