import { SupermarketDifficulty } from './../entities/supermarketDifficulty';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SmartAudio } from '../providers/smart-audio/smart-audio';
import { createConnection } from 'typeorm';
import { HomePage } from '../pages/home/home';
import { Product } from '../entities/product';
import { Category } from '../entities/category';
import { Level } from '../entities/level';
import { ProductLevel } from '../entities/productLevel';
import { User } from '../entities/user';
import { UserProgress } from '../entities/userProgress';
import { Difficulty } from '../entities/difficulty';
import { List } from '../entities/list';
import { ProductList } from '../entities/productList';
import { Presentation } from '../entities/presentation';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  async createDatabase() {
    if (this.platform.is('cordova')) {
      await createConnection({
        type: 'cordova',
        database: 'test',
        location: 'default',
        //logging: ['error', 'query', 'schema'],
        synchronize: true,
        entities: [
          Category,
          Product,
          Level,
          ProductLevel,
          User,
          UserProgress,
          Difficulty, 
          UserProgress,
          SupermarketDifficulty,
          Difficulty,
          List,
          ProductList,
          Presentation
        ]
      });
    } else {
      await createConnection({
        type: 'sqljs',
        autoSave: true,
        location: 'browser',
        //logging: ['error', 'query', 'schema'],
        synchronize: true,
        dropSchema: true,
        entities: [
          Category,
          Product,
          Level,
          ProductLevel,
          User,
          UserProgress,
          SupermarketDifficulty,
          Difficulty, 
          UserProgress,
          SupermarketDifficulty,
          Difficulty,
          List,
          ProductList,
          Presentation
        ]
      });
    }
  }

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public smartAudio: SmartAudio) {
    this.buildApp();
  }

  async buildApp() {
    await this.createDatabase();
    this.platform.ready().then(async () => {
      this.statusBar.styleDefault();
      this.statusBar.hide();
      this.hideSplashScreen(this.splashScreen);
      this.smartAudio.preload('mainSong', 'assets/audio/music.mp3');
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
