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
}