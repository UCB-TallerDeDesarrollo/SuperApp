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

    async countRows(): Promise<number> {
        let count: number = await this.difficultyRepository
            .createQueryBuilder('difficulty')
            .orderBy('difficulty.id', 'ASC')
            .getCount();
        return count;
    }

    async saveDifficulty(difficultyModel: DifficultyModel): Promise<void> {
        const difficultyEntity = new DifficultyEntity();

        difficultyEntity.id = difficultyModel.Id;
        difficultyEntity.code = difficultyModel.Code;
        difficultyEntity.difficultyType = difficultyModel.DifficultyType;
        difficultyEntity.lastLevel = difficultyModel.LastLevel;

        await this.difficultyRepository.save(difficultyEntity);
    }

    async getLastLevel(difficultyType: number): Promise<number> {

    }
}
