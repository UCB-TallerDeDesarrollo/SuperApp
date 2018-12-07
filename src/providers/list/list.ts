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
      list = await this.listRepository.save(list);
      result = true;
    } catch (error) {
      console.error(error);
      result = false;
    }
    return result;
  }

  async updateList(list: List): Promise<Boolean> {
    let result: Boolean;
    try {
      await this.listRepository.createQueryBuilder()
                                .update('list')
                                .set({ name: list.name })
                                .where("id = :id", {id: list.id})
                                .execute();
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
                                        .where("user_id = :userId", { userId: user_id })
                                        .andWhere("on_view = :onView", { onView: 1 })
                                        .getOne();
    } catch (error) {
      console.error(error);
      result = null;
    }
    return result;
  }

  async getListById(list_id: number): Promise<List> {
    let result: List;
    try {
      result = await this.listRepository.createQueryBuilder()
                                        .where("id = :id", { id: list_id })
                                        .getOne();
    } catch (error) {
      console.error(error);
      result = null;
    }
    return result;
  }

  async getListsByUserId(user_id: number): Promise<Array<List>> {
    let result: Array<List>;
    try {
      result = await this.listRepository.createQueryBuilder()
                                        .where("user_id = :userId", { userId: user_id })
                                        .getMany();
    } catch (error) {
      console.error(error);
      result = null;
    }
    return result;
  }

  async deleteList(list_id: number): Promise<Boolean> {
    let result: Boolean;
    try {
      await this.listRepository.createQueryBuilder()
                                .delete()
                                .from(List)
                                .where("id = :id", { id: list_id })
                                .execute();
      result = true;
    } catch (error) {
      result = false;
    }
    return result;
  }
}
