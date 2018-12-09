import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserInformationPage } from './user-information';

@NgModule({
  declarations: [
    UserInformationPage,
  ],
  imports: [
    IonicPageModule.forChild(UserInformationPage),
  ],
})
export class UserInformationPageModule {}
