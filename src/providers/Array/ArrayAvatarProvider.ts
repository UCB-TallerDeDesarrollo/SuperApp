import { AvatarProvider } from "../../shared/providers/AvatarProvider";

export class ArrayAvatarProvider implements AvatarProvider {
    private static readonly AVATARS = [
        { 'id': 0, 'name': "Sin avatar" },
        { 'id': 1, 'name': "Barbon" },
        { 'id': 2, 'name': "Ninja" },
        { 'id': 3, 'name': "Serio" },
        { 'id': 4, 'name': "Pinguino" },
        { 'id': 5, 'name': "Robot" },
        { 'id': 6, 'name': "Conejo" },
        { 'id': 7, 'name': "Amiga" },
        { 'id': 8, 'name': "Feliz" },
        { 'id': 9, 'name': "Seria" },
        { 'id': 10, 'name': "Rubia" },
        { 'id': 11, 'name': "Super" }
    ]

    getAvatars(): { id: number; name: string; }[] {
        return ArrayAvatarProvider.AVATARS;
    }

}