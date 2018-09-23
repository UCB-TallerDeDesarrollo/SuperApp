import { Injectable } from '@angular/core';
import { Product } from '../../entities/product';
import { getRepository, Repository } from 'typeorm';

@Injectable()
export class ProductProvider {

  productRepository: any;

  constructor() {
    this.productRepository = getRepository('product') as Repository<Product>;
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

  async getProductById(product_id: number) {
    let product = await this.productRepository.createQueryBuilder('product')
                                                .where("id = :id", {id: product_id})
                                                .getOne();
    return product;
  }

  async updateStateProduct(state_: boolean, product_id: number){
    await this.productRepository.createQueryBuilder()
                                  .update('product')
                                  .set({ state: state_ })
                                  .where("id = :id", {id: product_id})
                                  .execute();
  } 

  async updateProduct(product: Product){
    await this.productRepository.createQueryBuilder()
                                .update('product')
                                .set({ state: product.state, title: product.title, image: product.image, category: product.category })
                                .where("id = :id", {id: product.id})
                                .execute();
  }
  
  async getProductsByCategory(category_id: number){
    let products = await this.productRepository.createQueryBuilder('product')
                                .where("categoryId = :categoryId", {categoryId: category_id})
                                .getMany();
    return products;
  }

  async countProducts() {
    let count = await this.productRepository.createQueryBuilder('product')
                                                .orderBy('product.id', 'ASC')
                                                .getCount();
    return count;
  }
}
