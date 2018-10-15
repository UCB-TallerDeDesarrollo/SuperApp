export abstract class DifficultyProvider {
    abstract countUsers(): Promise<number>;
}
