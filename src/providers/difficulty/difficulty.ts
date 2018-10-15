import { Injectable } from '@angular/core';
import { Difficulty as DifficultyEntity } from '../../entities/difficulty';
import { Difficulty as DifficultyModel } from '../../shared/models/Difficulty.model';
import { getRepository, Repository } from 'typeorm';
import { DifficultyProvider } from '../../shared/providers/DifficultyProvider';

@Injectable()
export class TypeormDifficultyProvider implements DifficultyProvider {

    private difficultyRepository: any;

    constructor() {
        this.difficultyRepository = getRepository('difficulty') as Repository<DifficultyEntity>;
    }

    async countUsers() {
        let count: number = await this.difficultyRepository
            .createQueryBuilder('difficulty')
            .orderBy('difficulty.id', 'ASC')
            .getCount();
        return count;
    }
}
