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
        let difficultyEntity = await this.difficultyRepository.createQueryBuilder('difficulty')
            .where('difficultyType = :difficultyType', { difficultyType: difficultyType })
            .getOne();
        return Number(difficultyEntity.lastLevel);
    }

    async updateLastLevel(difficultyType: number, lastLevel: number): Promise<void> {
        await this.difficultyRepository
            .createQueryBuilder()
            .update('difficulty')
            .set({ lastLevel: lastLevel })
            .where('difficultyType = :difficultyType', { difficultyType: difficultyType })
            .execute();
    }

    async saveProgressByLevel(difficultyType: number, level: number): Promise<void> {
        if(level > 0 && level <= 218) {
            let posLevel = 0;
            if(difficultyType == 0) {
                posLevel = level - 1;
            }
            if(difficultyType == 1) {
                posLevel = level - 16;
            }
            if(difficultyType == 2) {
                posLevel = level - 31;
            }
            if(difficultyType == 3) {
                posLevel = level - 125;
            }
            let temporalDifficulty = await this.difficultyRepository.createQueryBuilder('difficulty')
                .where('difficultyType = :difficultyType', { difficultyType: difficultyType })
                .getOne();
            let progressCode: string = temporalDifficulty.code;
            progressCode = this.setCharAt(progressCode, posLevel, 1);
            await this.difficultyRepository
                .createQueryBuilder()
                .update('difficulty')
                .set({ code: progressCode })
                .where('difficultyType = :difficultyType', { difficultyType: difficultyType })
                .execute();
        }
    }

    private setCharAt(str, index, chr) {
        if(index > str.length - 1) {
            return str;
        }
        return str.substr(0,index) + chr + str.substr(index + 1);
    }
}
