import { ArrayManager } from '../../Managers/ArrayManager';
import { ColorProvider } from '../../shared/providers/ColorProvider';

export class ArrayColorProvider implements ColorProvider {


    public getRandomColor(colors) : string {
        return ArrayManager.get_random_element(colors);
    }

    public getRandomBackgroundColor(colors) : string {
        return ArrayManager.get_random_element(colors);
    }
}
