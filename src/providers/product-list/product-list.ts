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

  async getProductListByListId(list_id: number): Promise<Array<ProductList>> {
    let result: Array<ProductList>;
    try {
      result = this.productListRepository.createQueryBuilder()
                                          .where("list_id = :listId", { listId: list_id})
                                          .getMany();
    } catch (error) {
      console.error(error);
      result = null;
    }
    return result;
  }

  async deleteProductList(product_list_id: number): Promise<Boolean> {
    let result: Boolean;
    try {
      await this.productListRepository.createQueryBuilder()
                                      .delete()
                                      .from(ProductList)
                                      .where("id = :id", { id: product_list_id })
                                      .execute();
      result = true;
    } catch (error) {
      console.error(error);
      result = false;
    }
    return result;
  }

  async deleteProductListByListId(list_id: number): Promise<Boolean> {
    let result: Boolean;
    try {
      await this.productListRepository.createQueryBuilder()
                                      .delete()
                                      .from(ProductList)
                                      .where("list_id = :id", { id: list_id })
                                      .execute();
      result = true;
    } catch (error) {
      console.error(error);
      result = false;
    }
    return result;
  }
}
