import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditCategoryPage } from './edit-category';

@NgModule({
  declarations: [
    EditCategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(EditCategoryPage),
  ],
})
export class EditCategoryPageModule {}
