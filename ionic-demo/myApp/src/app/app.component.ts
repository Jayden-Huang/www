import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { SettingProvider } from '../providers/setting/setting';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  theme:string;

  constructor(platform: Platform, 
              statusBar: StatusBar,
               splashScreen: SplashScreen,
               private settingProvider:SettingProvider) {
    this.settingProvider.getActiveTheme().subscribe(val=>this.theme=val);
    platform.ready().then(() => {  
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
