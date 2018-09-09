import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LevelCompletePage } from './level-complete';

@NgModule({
  declarations: [
    LevelCompletePage,
  ],
  imports: [
    IonicPageModule.forChild(LevelCompletePage),
  ],
})
export class LevelCompletePageModule {}
