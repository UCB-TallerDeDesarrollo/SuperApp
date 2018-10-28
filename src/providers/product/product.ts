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

  async getProducts(): Promise<Array<Product>> {
    let result: Array<Product>
    try {
      result = await this.productRepository.createQueryBuilder()
                                            .orderBy('id', 'ASC')
                                            .getMany();
    } catch (error) {
      console.error(error);
      result = null;
    }
    return result;
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

  async updateProduct(product: Product){
    await this.productRepository.createQueryBuilder()
                                .update(Product)
                                .set({ state: product.state, title: product.title, image: product.image,audio: product.audio, category: product.category_id, on_list: product.on_list })
                                .where("id = :id", {id: product.id})
                                .execute();
  }


  async getProductsByCategory(category_id: number){
    let products = await this.productRepository.createQueryBuilder()
                                .where("category_id = :categoryId", { categoryId: category_id })
                                .orderBy('id', 'ASC')
                                .getMany();
    return products;
  }

  async getProductsByCategoryOnlyActive(category_id: number) {
    let products = await this.productRepository.createQueryBuilder()
      .where("category_id = :categoryId", { categoryId: category_id })
      .andWhere("state = :state", { state: 1 })
      .andWhere("on_list = :on_list", { on_list: 1 })
      .orderBy('id', 'ASC')
      .getMany();
    return products;
  }

  async countProducts() {
    let count = await this.productRepository.createQueryBuilder()
                                                .orderBy('id', 'ASC')
                                                .getCount();
    return count;
  }

  async updateCategory(category: Category, other: Category) {
    await this.productRepository.createQueryBuilder()
                                .update(Product)
                                .set({ category_id: other.id })
                                .where("category_id = :category_id", {category_id: category.id})
                                .execute();
  }
}
