import { Injectable } from '@angular/core';
import { getRepository, Repository } from 'typeorm';
import { ProductLevel } from '../../entities/productLevel';

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

  async getProductsByLevelId(levelId_: number) {
    let products = this.productLevelRepository.createQueryBuilder('product_level')
                                                  .where('levelId = :levelId', { levelId: levelId_ })
                                                  .getMany();
    return products;                                                  
  }

}
