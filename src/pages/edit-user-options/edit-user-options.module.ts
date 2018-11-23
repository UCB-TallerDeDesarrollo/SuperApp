import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditUserOptionsPage } from './edit-user-options';

@NgModule({
  declarations: [
    EditUserOptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(EditUserOptionsPage),
  ],
})
export class EditUserOptionsPageModule {}
