import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserDataListPage } from './user-data-list';

@NgModule({
  declarations: [
    UserDataListPage,
  ],
  imports: [
    IonicPageModule.forChild(UserDataListPage),
  ],
})
export class UserDataListPageModule {}
