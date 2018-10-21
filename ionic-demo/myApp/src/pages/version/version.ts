import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';


@IonicPage()
@Component({
  selector: 'page-version',
  templateUrl: 'version.html',
})
export class VersionPage {
  
  myAppName:string;
  packageName:string;
  versionCode:string;
  version:string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public appVersion:AppVersion) {
  }

  ionViewDidLoad() {
    this.appVersion.getAppName().then(v=>{
       this.version = v;
    });
    this.appVersion.getPackageName().then(v=>{
      this.packageName = v;
    });
    this.appVersion.getVersionCode().then(v=>{
      this.versionCode = <string>v;
   });
    this.appVersion.getVersionNumber().then(v=>{
      this.version = v;
   });
  }



}
