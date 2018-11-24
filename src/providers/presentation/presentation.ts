import { Injectable } from '@angular/core';
import { getRepository, Repository } from 'typeorm';
import { Presentation } from '../../entities/presentation';

@Injectable()
export class PresentationProvider {

  presentationRepository: any;

  constructor() {
    this.presentationRepository = getRepository('presentation') as Repository<Presentation>;
  }

  async isFirstTime() : Promise<boolean> {
    let result: number;
    try {
      result = await this.presentationRepository.createQueryBuilder()
        .getCount();
    } catch (error) {
      console.error(error);
      result = 0;
    }
    return result == 0;
  }

  async saveFirstTime(): Promise<void> {
    try {
      let presentation = {};
      await this.presentationRepository.save(presentation);
    } catch (error) {
      console.error(error);
    }
  } 
}
