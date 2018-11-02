import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { CreateUserPage } from './create-user';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    CreateUserPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    IonicPageModule.forChild(CreateUserPage),
  ],
})
export class CreateUserPageModule {}
