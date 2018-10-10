import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateCategoryPage } from './create-category';

@NgModule({
  declarations: [
    CreateCategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateCategoryPage),
  ],
})
export class CreateCategoryPageModule {}
