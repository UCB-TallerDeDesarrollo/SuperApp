import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateListPage } from './create-list';

@NgModule({
  declarations: [
    CreateListPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateListPage),
  ],
})
export class CreateListPageModule {}
