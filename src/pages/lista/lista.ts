import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataBaseService } from '../../providers/database-service/database-service';
@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html'
})
export class ListaPage {

  public products:any;
  constructor(public navCtrl: NavController) {
    this.products=DataBaseService.getProducts();
  }
 
}
