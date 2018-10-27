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

  async saveProduct(product: Product) {
    await this.productRepository.save(product);
  }

  async getProducts() {
    let products = await this.productRepository.createQueryBuilder('product')
                                                .orderBy('id', 'ASC')
                                                .getMany();
    return products;
  }

  async getProductById(product_id: number) {
    let product = await this.productRepository.createQueryBuilder('product')
                                                .where("id = :id", {id: product_id})
                                                .getOne();
    return product;
  }

  async updateStateProduct(state_: number, product_id: number){
    await this.productRepository.createQueryBuilder()
                                  .update('product')
                                  .set({ state: state_ })
                                  .where("id = :id", {id: product_id})
                                  .execute();
  }

  async updateOnList(product_id: number) {
    await this.productRepository.createQueryBuilder()
                                .update('product')
                                .set({ on_list: true })
                                .where("id = :id", {id: product_id})
                                .execute();
  }

  async updateProduct(product: Product){
    await this.productRepository.createQueryBuilder()
                                .update('product' )
                                .set({ state: product.state, title: product.title, image: product.image,audio: product.audio, category: product.category_id, on_list: product.on_list })
                                .where("id = :id", {id: product.id})
                                .execute();
  }


  async getProductsByCategory(category_id: number){
    let products = await this.productRepository.createQueryBuilder('product')
                                .where("category_id = :categoryId", { categoryId: category_id })
                                .orderBy('id', 'ASC')
                                .getMany();
    return products;
  }

  async getProductsByCategoryOnlyActive(category_id: number) {
    let products = await this.productRepository.createQueryBuilder('product')
      .where("category_id = :categoryId", { categoryId: category_id })
      .andWhere("state = :state", { state: 1 })
      .andWhere("on_list = :on_list", { on_list: 1 })
      .orderBy('id', 'ASC')
      .getMany();
    return products;
  }

  async countProducts() {
    let count = await this.productRepository.createQueryBuilder('product')
                                                .orderBy('id', 'ASC')
                                                .getCount();
    return count;
  }

  async updateCategory(category: Category, other: Category) {
    await this.productRepository.createQueryBuilder()
                                .update('product')
                                .set({ category_id: other.id })
                                .where("category_id = :category_id", {category_id: category.id})
                                .execute();
  }
}
