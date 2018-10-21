import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeatilsPage } from './deatils';

@NgModule({
  declarations: [
    DeatilsPage,
  ],
  imports: [
    IonicPageModule.forChild(DeatilsPage),
  ],
})
export class DeatilsPageModule {}
