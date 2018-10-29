import { getRepository, Repository } from 'typeorm';
import { Injectable } from '@angular/core';
import { ProductList } from '../../entities/productList';

@Injectable()
export class ProductListProvider {

  productListRepository: any;

  constructor() {
    this.productListRepository = getRepository('product_list') as Repository<ProductList>;
  }

  async saveProductList(productList: ProductList): Promise<Boolean> {
    let result: Boolean;
    try {
      await this.productListRepository.save(productList);
      result = true;
    } catch (error) {
      console.error(error);
      result = false;
    }
    return result;
  }

}
