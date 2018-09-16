import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SmartAudio } from '../providers/smart-audio/smart-audio';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, smartAudio: SmartAudio) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      this.hideSplashScreen(splashScreen);
     smartAudio.preload('mainSong', 'assets/audio/music.mp3');
      smartAudio.nativeAudio.play('mainSong', () => console.log('uniqueId1 is done playing'));
    });
  }
  hideSplashScreen(splashScreen) {
    if (splashScreen) {
      setTimeout(() => {
        splashScreen.hide();
      }, 100);
     }
    }
}
