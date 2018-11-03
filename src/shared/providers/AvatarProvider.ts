export abstract class AvatarProvider {
    abstract getAvatars(): { id: number, name: string } [];
}