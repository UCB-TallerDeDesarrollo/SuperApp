import { UserController } from './../providers/user/UserController';
import { EditUserPage } from './../pages/edit-user/edit-user';
import { LoadingPage } from './../pages/loading/loading';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Platform, NavController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { Media } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { SupermarketPage} from '../pages/supermarket/supermarket';
import { HomePage } from '../pages/home/home';
import { ListaPage } from '../pages/lista/lista';
import { WordPage } from '../pages/word/word';
import { MenuGamesPage } from '../pages/menu-games/menu-games';
import { ProductsPage } from '../pages/products/products';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { DragulaModule, DragulaService } from 'ng2-dragula';
import { LevelCompletePage } from '../pages/level-complete/level-complete';
import { SupermarketLevelCompletePage } from '../pages/supermarket-level-complete/supermarket-level-complete';
import { ProductsProvider } from '../providers/product/product';
import { CategoriesPage } from '../pages/categories/categories';
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
import { CreateProductPage } from '../pages/create-product/create-product';
import { CategoryProvider } from '../providers/category/category';
import { LevelProvider } from '../providers/level/level';
import { ProductLevelProvider } from '../providers/product-level/product-level';
import { ProductsEditorPage } from '../pages/products-editor/products-editor';
import { EditProductPage } from '../pages/edit-product/edit-product';
import { SelectDifficultyPage } from '../pages/select-difficulty/select-difficulty';
import { TextToSpeech } from '@ionic-native/text-to-speech'
import { CreateCategoryPage } from '../pages/create-category/create-category';
import { EditCategoryPage } from '../pages/edit-category/edit-category';
import { DragulaSupermarketDragDropProvider } from '../providers/Dragula/DragulaSupermarketDragDropProvider';
import { SupermarketDragDropProvider } from '../shared/providers/SupermarketDragDropProvider';
import { UserProvider } from '../providers/user/user';
import { CreateUserPage } from '../pages/create-user/create-user';
import { UserLoginPage } from '../pages/user-login/user-login';
import { Login } from '../providers/login/login';
import { ViewUserPage } from '../pages/view-user/view-user';
import { DifficultyProvider } from '../shared/providers/DifficultyProvider';
import { TypeormDifficultyProvider } from '../providers/difficulty/difficulty';
import { DeleteUserPage } from '../pages/delete-user/delete-user';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MenuGamesPage,
    ListaPage,
    WordPage,
    ProductsPage, 
    LevelCompletePage,
    SupermarketLevelCompletePage,
    LoadingPage,
    SelectLevelPage,
    CreateProductPage,
    ProductsEditorPage,
    EditProductPage,
    SelectDifficultyPage,
    SupermarketPage,
    CategoriesPage,
    CreateCategoryPage,
    EditCategoryPage,
    CreateUserPage,
    UserLoginPage,
    EditUserPage, 
    ViewUserPage, 
    DeleteUserPage,
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
    SupermarketLevelCompletePage,
    LoadingPage,
    SelectLevelPage,
    CreateProductPage,
    ProductsEditorPage,
    EditProductPage,
    SelectDifficultyPage,
    SupermarketPage,
    CategoriesPage,
    CreateCategoryPage,
    EditCategoryPage,
    CreateUserPage,
    UserLoginPage, 
    EditUserPage, 
    ViewUserPage,
    DeleteUserPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ScreenOrientation,
    SmartAudio,
    NativeAudio,
    DragulaService,
    Login,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: ProductProvider, useClass: ArrayProductProvider},
    {provide: ColorProvider, useClass: ArrayColorProvider},
    {provide: DifficultyProvider, useClass: TypeormDifficultyProvider},
    {provide: WordDragDropProvider, useClass: DragulaWordDragDropProvider, deps: [DragulaService, Platform]},
    {provide: SupermarketDragDropProvider, useClass: DragulaSupermarketDragDropProvider, deps: [DragulaService, Platform]},
    ProductsProvider,
    CategoryProvider,
    LevelProvider,
    ProductLevelProvider,
    UserProvider,
    TextToSpeech,
    UserController,
    {provide: AudioProvider, useClass: NativeAudioProvider, deps: [NativeAudio, Platform, TextToSpeech]},
    File,
    Media
    
  ]
})
export class AppModule { }
