import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getRepository, Repository } from 'typeorm';
import { Level } from '../../entities/level';

/*
  Generated class for the LevelProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LevelProvider {

  levelRepository: any;

  constructor() {
    this.levelRepository = getRepository('level') as Repository<Level>
    console.log('Hello LevelProvider Provider');
  }

  async saveLevel(level: Level) {
    await this.levelRepository.save(level);
  }

}
