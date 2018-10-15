import { Difficulty } from "../models/Difficulty.model";

export abstract class DifficultyProvider {
    abstract countRows(): Promise<number>;
    abstract saveDifficulty(difficultyModel: Difficulty): Promise<void>;
    abstract getLastLevel(difficultyType: number): Promise<number>;
    abstract updateLastLevel(difficultyType: number, lastLevel: number): Promise<void>;
    abstract saveProgressByLevel(difficultyType: number, level: number): Promise<void>;
}
