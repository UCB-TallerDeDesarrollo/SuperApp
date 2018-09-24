import { LoadingPage } from './../pages/loading/loading';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListaPage } from '../pages/lista/lista';
import { WordPage } from '../pages/word/word';
import { MenuGamesPage } from '../pages/menu-games/menu-games';
import { ProductsPage } from '../pages/products/products';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { DragulaModule, DragulaService } from 'ng2-dragula';
import { LevelCompletePage } from '../pages/level-complete/level-complete';
import { ProductsProvider } from '../providers/product/product';
import { SmartAudio } from '../providers/smart-audio/smart-audio';
import { NativeAudio } from '@ionic-native/native-audio';
import { ArrayProductProvider } from '../providers/Array/ArrayProductProvider';
import { ArrayColorProvider } from '../providers/Array/ArrayColorProvider';
import { ColorProvider } from '../shared/providers/ColorProvider';
import { ProductProvider } from '../shared/providers/ProductProvider';
import { WordDragDropProvider } from '../shared/providers/WordDragDropProvider';
import { DragulaWordDragDropProvider } from '../providers/Dragula/DragulaWordDragDropProvider';
import { AudioProvider } from '../shared/providers/AudioProvider';
import { NativeAudioProvider } from '../providers/Native/NativeAudioProvider';
import { SelectLevelPage } from '../pages/select-level/select-level';
import { ProductsProvider } from '../providers/product/product';
import { CreateProductPage } from '../pages/create-product/create-product';
import { CategoryProvider } from '../providers/category/category';
import { LevelProvider } from '../providers/level/level';
import { ProductLevelProvider } from '../providers/product-level/product-level';
import { ProductsEditorPage } from '../pages/products-editor/products-editor';
import { EditProductPage } from '../pages/edit-product/edit-product';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MenuGamesPage,
    ListaPage,
    WordPage,
    ProductsPage, 
    LevelCompletePage,
    LoadingPage,
    SelectLevelPage,
    CreateProductPage,
    ProductsEditorPage,
    EditProductPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    DragulaModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MenuGamesPage,
    ListaPage,
    WordPage,
    ProductsPage, 
    LevelCompletePage,
    LoadingPage,
    SelectLevelPage,
    CreateProductPage,
    ProductsEditorPage,
    EditProductPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ScreenOrientation,
    SmartAudio,
    NativeAudio,
    DragulaService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProductProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: ProductProvider, useClass: ArrayProductProvider},
    {provide: ColorProvider, useClass: ArrayColorProvider},
    {provide: WordDragDropProvider, useClass: DragulaWordDragDropProvider, deps: [DragulaService, Platform]},
    {provide: AudioProvider, useClass: NativeAudioProvider, deps: [NativeAudio]},
    ProductsProvider,
    CategoryProvider,
    LevelProvider,
    ProductLevelProvider
  ]
})
export class AppModule { }
