import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import {HttpModule} from '@angular/http';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { DiscoveryPage } from '../pages/discovery/discovery';
import { ChatPage } from '../pages/chat/chat';
import { NotificationPage } from '../pages/notification/notification';
import { MorePage } from '../pages/more/more';
import { TabsPage } from '../pages/tabs/tabs';
import { HeadfacePage } from '../pages/headface/headface';

import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { UserPage } from '../pages/user/user';
import { QuestionPage } from '../pages/question/question';
import { DeatilsPage } from '../pages/deatils/deatils';

import { ChatdetailsPage } from '../pages/chatdetails/chatdetails';

import { AnswerPage } from '../pages/answer/answer';

import { UserDataListPage } from '../pages/user-data-list/user-data-list';
import { ScanPage } from "../pages/scan/scan";
import { VersionPage } from "../pages/version/version";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestProvider } from '../providers/rest/rest';

import { IonicStorageModule } from '@ionic/storage';
import { QRScanner} from '@ionic-native/qr-scanner';
import { AppVersion } from '@ionic-native/app-version';

import { File} from '@ionic-native/file';
import { FileTransfer,FileTransferObject} from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { EmojiProvider } from '../providers/emoji/emoji';

import { ComponentsModule } from '../components/components.module'
import { ChatserviceProvider } from '../providers/chatservice/chatservice';

import { RelativePiePipe } from '../pipes/relative-pie/relative-pie';
import { SettingProvider } from '../providers/setting/setting';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DiscoveryPage,
    ChatPage,
    NotificationPage,
    MorePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    UserPage,
    HeadfacePage,
    QuestionPage,
    DeatilsPage,
    AnswerPage,
    ChatdetailsPage,
    UserDataListPage,
    RelativePiePipe,
    ScanPage,
    VersionPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{
      backButtonText:'返回'
    }),
    IonicStorageModule.forRoot(),
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DiscoveryPage,
    ChatPage,
    NotificationPage,
    MorePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    UserPage,
    HeadfacePage,
    QuestionPage,
    DeatilsPage,
    AnswerPage,
    ChatdetailsPage,
    UserDataListPage,
    ScanPage,
    VersionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    File,
    FileTransfer,
    FilePath,
    Camera,
    QRScanner,
    AppVersion,
    EmojiProvider,
    ChatserviceProvider,
    SettingProvider
  ]
})
export class AppModule {}
