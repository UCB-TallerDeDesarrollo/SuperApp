import { Injectable } from '@angular/core';
import { Product } from '../../entities/product';
import { getRepository, Repository } from 'typeorm';
import { Category } from '../../entities/category';

@Injectable()
export class ProductsProvider {

  productRepository: any;

  constructor() {
    this.productRepository = getRepository('product') as Repository<Product>;
  }

  async saveProduct(product: Product): Promise<Boolean> {
    let result: Boolean;
    try {
      await this.productRepository.save(product);
      result = true;
    } catch (error) {
      console.error(error);
      result = false;
    }
    return result;
  } 

  async getProductsByUserId(user_id: number): Promise<Array<Product>> {
    let result: Array<Product>
    try {
      result = await this.productRepository.createQueryBuilder()
                                            .where("user_id = :user_id", {user_id: user_id})
                                            .orderBy('id', 'ASC')
                                            .getMany();
    } catch (error) {
      console.error(error);
      result = null;
    }
    return result;
  }

  async isItATitleValid(title: string, user_id: number): Promise<Boolean> {
    let result: number;
    try {
      result = await this.productRepository.createQueryBuilder()
                                            .where("title = :title", { title: title })
                                            .andWhere("user_id = :user_id", { user_id: user_id})
                                            .getCount();
    } catch (error) {
      console.error(error);
      result = 0;
    }
    return (result == 0);
  }

  async getProductById(product_id: number): Promise<Product> {
    let result: Product;
    try {
      result = await this.productRepository.createQueryBuilder()
                                            .where("id = :id", {id: product_id})
                                            .getOne();
    } catch (error) {
      console.error(error);
      result = null;
    }
    return result;
  }

  async getAsyncProductById(product_id: number){
    let result: Product;
    result = await this.productRepository.createQueryBuilder()
                                          .where("id = :id", {id: product_id})
                                          .getOne();
                                          
    return new Promise<Product>((resolve, reject) => {
      resolve(result);
    });
  }

  async updateStateProduct(state_: number, product_id: number): Promise<Boolean>{
    let result: Boolean;
    try {
      await this.productRepository.createQueryBuilder()
                                  .update(Product)
                                  .set({ state: state_ })
                                  .where("id = :id", {id: product_id})
                                  .execute();
      result = true;
    } catch (error) {
      console.error(error);
      result = false;
    }
    return result;
  }

  async updateOnList(product_id: number): Promise<Boolean> {
    let result: Boolean;
    try {
      await this.productRepository.createQueryBuilder()
                                  .update(Product)
                                  .set({ on_list: 1 })
                                  .where("id = :id", {id: product_id})
                                  .execute();
      result = true;
    } catch (error) {
      console.error(error);
      result = false;
    }
    return result;
  }

  async updateProduct(product: Product): Promise<Boolean> {
    let result: Boolean;
    try {
      await this.productRepository.createQueryBuilder()
                                  .update(Product)
                                  .set({ state: product.state, title: product.title, image: product.image,audio: product.audio, category_id: product.category_id, on_list: product.on_list })
                                  .where("id = :id", {id: product.id})
                                  .execute();
      result = true;
    } catch (error) {
      console.error(error);
      result = false;
    }
    return result;
  }


  async getProductsByCategory(category_id: number): Promise<Array<Product>> {
    let result: Array<Product>;
    try {
      result = await this.productRepository.createQueryBuilder()
                                            .where("category_id = :categoryId", { categoryId: category_id })
                                            .orderBy('id', 'ASC')
                                            .getMany();
    } catch (error) {
      console.error(error);
      result = null
    }
    return result;
  }

  async getProductsByCategoryAndUserIdOnlyActive(category_id: number, user_id: number): Promise<Array<Product>> {
    let result: Array<Product>;
    try {
      result = await this.productRepository.createQueryBuilder()
                                            .where("category_id = :categoryId", { categoryId: category_id })
                                            .andWhere("state = :state", { state: 1 })
                                            .andWhere("user_id = :user_id", { user_id: user_id})
                                            .orderBy('id', 'ASC')
                                            .getMany();
    } catch (error) {
      console.error(error);
      result = null;
    }
    return result;
  }

  async countProducts(): Promise<number> {
    let result: number;
    try {
      result = await this.productRepository.createQueryBuilder()
                                                .orderBy('id', 'ASC')
                                                .getCount();
    } catch (error) {
      console.error(error);
      result = null;
    }
    return result;
  }

  async updateCategory(category: Category, other: Category): Promise<Boolean> {
    let result: Boolean;
    try {
      await this.productRepository.createQueryBuilder()
                                  .update(Product)
                                  .set({ category_id: other.id })
                                  .where("category_id = :category_id", {category_id: category.id})
                                  .execute();
      result = true;
    } catch (error) {
      console.error(error);
      result = false;
    }
    return result;
  }
}
