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

    async updateLastLevel(lastLevel: number): Promise<void> {
        let difficultyType = this.getDifficultType(lastLevel);
        await this.difficultyRepository
            .createQueryBuilder()
            .update('difficulty')
            .set({ lastLevel: lastLevel })
            .where('difficultyType = :difficultyType', { difficultyType: difficultyType })
            .execute();
    }

    async saveProgressByLevel(level: number): Promise<void> {
        let difficultyType = this.getDifficultType(level);
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
                console.log("SOY TEMPORAL DIFFICULTY: "+temporalDifficulty.DifficultyType);
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

    private getDifficultType(level: number): number {
        if(level >= 1 && level < 16) {
            return 0;
        }
        if(level >= 16 && level < 31) {
            return 1;
        }
        if(level >= 31 && level < 125) {
            return 2;
        }
        if(level >= 125) {
            return 3;
        }
        return -1;
    }

    async getPercentageProgress(difficultyType: number): Promise<number> {
        let difficultyEntity = await this.difficultyRepository.createQueryBuilder('difficulty')
            .where('difficultyType = :difficultyType', { difficultyType: difficultyType })
            .getOne();
        let code: string = difficultyEntity.code;
        let count: number = 0;
        for(let index = 0; index < code.length; ++index) {
            if(code.charAt(index) == '1') {
                ++count;
            }
        }
        if(difficultyType == 0 || difficultyType == 1) {
            return (count / 15) * 100;
        }
        if(difficultyType == 2 || difficultyType == 3) {
            return (count / 94) * 100;
        }
        return 0;
    }
}
