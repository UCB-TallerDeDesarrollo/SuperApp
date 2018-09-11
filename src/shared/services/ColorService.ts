import { ArrayManager } from '../../Managers/ArrayManager';

export class ColorService {

    static COLORS: string[] = [
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

    public getRandomColor() : string {
        return ArrayManager.get_random_element(ColorService.COLORS);
    }
}
