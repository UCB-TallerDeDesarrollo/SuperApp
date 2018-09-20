import { Injectable } from '@angular/core';
import { getRepository, Repository } from 'typeorm';
import { Category } from '../../entities/category';

/*
  Generated class for the CategoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CategoryProvider {

  categoryRepository: any;

  constructor() {
    this.categoryRepository = getRepository('category') as Repository<Category>;
    console.log('Hello CategoryProvider Provider');
  }

  async saveCategory(category: Category) {
    await this.categoryRepository.save(category);
  }

  async getCategories() {
    let categories = await this.categoryRepository.createQueryBuilder('category')
                                            .orderBy('category.id', 'ASC')
                                            .getMany();
    return categories;
  }

  async getCategoryById(category_id: number) {
    let category = await this.categoryRepository.createQueryBuilder('category')
                                          .where("category.id = :id", {id: category_id})
                                          .getOne();
    return category;                                          
  }
  
  async countProducts() {
    let count = await this.categoryRepository.createQueryBuilder('category')
                                                .orderBy('category.id', 'ASC')
                                                .getCount();
    return count;
  }
}
