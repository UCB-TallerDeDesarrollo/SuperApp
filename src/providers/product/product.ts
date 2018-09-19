import { Injectable } from '@angular/core';
import { Product } from '../../entities/product';
import { getRepository, Repository } from 'typeorm';

/*
  Generated class for the ProductProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductProvider {

  productRepository: any;

  constructor() {
    this.productRepository = getRepository('product') as Repository<Product>;
    console.log('Hello ProductProvider Provider');
  }

  async saveProduct(product: Product) {
    await this.productRepository.save(product);
  }

  async getProducts() {
    let products = await this.productRepository.createQueryBuilder('product')
                                                .orderBy('product.id', 'ASC')
                                                .getMany();
    return products;
  }

  async updateStateProduct(state_: boolean, product_id: number){
    await this.productRepository.createQueryBuilder()
                                  .update('product')
                                  .set({ state: state_ })
                                  .where("id = :id", {id: product_id})
                                  .execute();
  } 
  
  async countProducts() {
    let count = await this.productRepository.createQueryBuilder('product')
                                                .orderBy('product.id', 'ASC')
                                                .getCount();
    return count;
  }
}
