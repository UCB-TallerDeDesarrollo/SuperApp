import { AvatarProvider } from "../../shared/providers/AvatarProvider";

export class ArrayAvatarProvider implements AvatarProvider {
    private static readonly AVATARS = [
        { 'id': 0, 'name': "Sin avatar" },
        { 'id': 1, 'name': "Barbon" },
        { 'id': 2, 'name': "Ninja" },
        { 'id': 3, 'name': "Serio" },
        { 'id': 4, 'name': "Pinguino" },
        { 'id': 5, 'name': "Robot" },
    ]

    getAvatars(): { id: number; name: string; }[] {
        return ArrayAvatarProvider.AVATARS;
    }

}