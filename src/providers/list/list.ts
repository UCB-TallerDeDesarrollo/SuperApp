import { Injectable } from '@angular/core';
import { getRepository, Repository } from 'typeorm';
import { List } from '../../entities/list';

@Injectable()
export class ListProvider {

  listRepository: any;

  constructor() {
    this.listRepository = getRepository('list') as Repository<List>;
  }

  async saveList(list: List): Promise<Boolean> {
    let result: Boolean;
    try {
      await this.listRepository.save(list);
      result = true;
    } catch (error) {
      console.error(error);
      result = false;
    }
    return result;
  }

  async getListOnViewByUserId(user_id: number): Promise<List> {
    let result: List;
    try {
      result = await this.listRepository.createQueryBuilder()
                                          .where("user_id = :userId", { userId: user_id})
                                          .andWhere("on_view = :onView", { onView: 1})
                                          .getOne();
    } catch (error) {
      console.error(error);
      result = null;
    }
    return result;
  }

}
