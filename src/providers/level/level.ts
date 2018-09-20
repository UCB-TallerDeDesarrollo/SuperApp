import { Injectable } from '@angular/core';
import { getRepository, Repository } from 'typeorm';
import { Level } from '../../entities/level';

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
