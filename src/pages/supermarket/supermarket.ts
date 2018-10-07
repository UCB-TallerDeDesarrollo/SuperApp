import { CategoryProvider } from './../../providers/category/category';
import { Component, OnInit, AfterViewInit } from '@angular/core'; 
import { IonicPage, NavController, NavParams } from 'ionic-angular'; 
 
import { ProductsProvider } from '../../providers/product/product'; 
import {SuperMarketGame} from '../../shared/models/SupermarketGame'; 

@IonicPage()
@Component({
  selector: 'page-supermarket',
  templateUrl: 'supermarket.html',
})
export class SupermarketPage implements OnInit, AfterViewInit{
   
}
