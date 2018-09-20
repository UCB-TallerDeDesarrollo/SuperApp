import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getRepository, Repository } from 'typeorm';

/*
  Generated class for the ProductLevelProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductLevelProvider {

  productLevelRepository: any;

  constructor() {
    this.productLevelRepository = getRepository('product_level') ;
    console.log('Hello ProductLevelProvider Provider');
  }

}
