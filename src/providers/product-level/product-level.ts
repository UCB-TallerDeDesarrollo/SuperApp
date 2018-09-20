import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getRepository, Repository } from 'typeorm';
import { ProductLevel } from '../../entities/productLevel';

/*
  Generated class for the ProductLevelProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductLevelProvider {

  productLevelRepository: any;

  constructor() {
    this.productLevelRepository = getRepository('product_level') as Repository<ProductLevel>;
    console.log('Hello ProductLevelProvider Provider');
  }

  async saveProductLevel(productLevel: ProductLevel) {
    await this.productLevelRepository.save(productLevel);
  }

  async getProductLevelByLevelId(level_id_: number) {
    let productlevel = this.productLevelRepository.createQueryBuilder('product_level')
                                                  .where('level_id = :level_id', { level_id: level_id_ })
                                                  .getOne();
    return productlevel;                                                  
  }

}
