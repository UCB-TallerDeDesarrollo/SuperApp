import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductsEditorPage } from './products-editor';

@NgModule({
  declarations: [
    ProductsEditorPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductsEditorPage),
  ],
})
export class ProductsEditorPageModule {}
