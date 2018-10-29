import { Difficulty } from "../models/Difficulty.model";

export abstract class SupermarketDifficultyProvider {
    abstract countRows(): Promise<number>;
    abstract saveDifficulty(difficultyModel: Difficulty): Promise<void>;
    abstract getLastLevel(difficultyType: number): Promise<number>;
    abstract updateLastLevel(lastLevel: number): Promise<void>;
    abstract saveProgressByLevel(level: number): Promise<void>;
    abstract getPercentageProgress(difficultyType: number): Promise<number>;
}
