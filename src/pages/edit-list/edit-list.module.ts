import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditListPage } from './edit-list';

@NgModule({
  declarations: [
    EditListPage,
  ],
  imports: [
    IonicPageModule.forChild(EditListPage),
  ],
})
export class EditListPageModule {}
