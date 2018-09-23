import { ArrayManager } from '../../Managers/ArrayManager';
import { ColorProvider } from '../../shared/providers/ColorProvider';

export class ArrayColorProvider implements ColorProvider {

    private static BACKGROUND_COLORS: string[] = [
        'color-background-1',
        'color-background-2', 
        'color-background-3',
        'color-background-4',
        'color-background-5'
    ];

    public getRandomColor(colors) : string {
        return ArrayManager.get_random_element(colors);
    }

    public getRandomBackgroundColor() : string {
        return ArrayManager.get_random_element(ArrayColorProvider.BACKGROUND_COLORS);
    }
}
