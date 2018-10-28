import { Injectable } from '@angular/core'; 
import { SupermarketDifficulty as DifficultyEntity } from './../../entities/supermarketDifficulty';
import { Difficulty as DifficultyModel } from '../../shared/models/Difficulty.model';
import { getRepository, Repository } from 'typeorm';
import { DifficultyProvider } from '../../shared/providers/DifficultyProvider';

@Injectable()
export class TypeormSupermarketDifficultyProvider implements DifficultyProvider {
    
    private difficultyRepository: any;
    
    constructor() {
        this.difficultyRepository = getRepository('supermarketdifficulty') as Repository<DifficultyEntity>;
    }
}
