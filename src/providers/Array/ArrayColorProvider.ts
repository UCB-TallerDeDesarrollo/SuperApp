import { ArrayManager } from '../../Managers/ArrayManager';
import { ColorProvider } from '../../shared/providers/ColorProvider';

export class ArrayColorProvider implements ColorProvider {

    private static COLORS: string[] = [
        '#B73D19',
        '#E7E41C',
        '#4CD10A',
        '#23A547',
        '#24AD81',
        '#2473AD',
        '#2433AD',
        '#1C818F',
        '#280D97',
        '#8C1D87'
    ];

    private static BACKGROUND_COLORS: string[] = [
        'color-background-1',
        'color-background-2', 
        'color-background-3',
        'color-background-4',
        'color-background-5'
    ];

    public getRandomColor() : string {
        return ArrayManager.get_random_element(ArrayColorProvider.COLORS);
    }

    public getRandomBackgroundColor() : string {
        return ArrayManager.get_random_element(ArrayColorProvider.BACKGROUND_COLORS);
    }
}
