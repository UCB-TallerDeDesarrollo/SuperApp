export class User {
    private id: number;
    private username: string;
    private birthdate: Date;
    private profilePictureURL: string;

    public constructor() {
        this.id = -1;
        this.username = '';
        this.birthdate = new Date('0000-00-00');
        this.profilePictureURL = '';
    }

    public static createUser(id: number, username: string, birthdate: Date, profilePictureURL: string) {
        let user = new User();

        user.id = id;
        user.username = username;
        user.birthdate = birthdate;
        user.profilePictureURL = profilePictureURL;

        return user;
    }

    public get Id(): number {
        return this.id;
    }

    public set Id(id: number) {
        this.id = id;
    }

    public get Username(): string {
        return this.username;
    }

    public set Username(username: string) {
        this.username = username;
    }
}