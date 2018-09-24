import { ColorsManager } from './ColorsManager';

describe('Test ColorsManager static function', function() {
    
    const availableColors : string[] = [
        'color-background-1',
        'color-background-2', 
        'color-background-3',
        'color-background-4',
        'color-background-5'
    ];

    it('ColorsManager must return a color from the array', function() {
        expect(availableColors).toContain(ColorsManager.get_color_style());
    });

});
