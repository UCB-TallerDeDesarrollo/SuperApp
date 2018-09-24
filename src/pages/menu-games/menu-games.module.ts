import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuGamesPage } from './menu-games';

@NgModule({
  declarations: [
    MenuGamesPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuGamesPage),
  ],
})
export class MenuGamesPageModule {}
