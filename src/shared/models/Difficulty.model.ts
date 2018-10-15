export class Difficulty {

    private id: number;
    private code: string;
    private difficultyType: number;
    private lastLevel: number;

    public constructor() {
        this.id = -1;
        this.code = '';
        this.difficultyType = -1;
        this.lastLevel = 0;
    }

    public static createDifficulty(id: number, code: string, difficultyType: number, lastLevel: number) : Difficulty {
        let resp = new Difficulty();
        resp.id = id;
        resp.code = code;
        resp.difficultyType = difficultyType;
        resp.lastLevel = lastLevel;
        return resp;
    }

    public get Id(): number {
        return this.id;
    }

    public get Code(): string {
        return this.code;
    }

    public get DifficultyType(): number {
        return this.difficultyType;
    }
    public get LastLevel(): number {
        return this.lastLevel;
    }
    
}
