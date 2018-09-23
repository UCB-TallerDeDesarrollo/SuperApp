import { ArrayColorProvider } from './ArrayColorProvider';

describe("Test ArrayColorProvider static functions", function() {
    it("ArrayColorProvider must return a color from the array", function() {
        let arrayColorProvider: ArrayColorProvider;
        arrayColorProvider = new ArrayColorProvider();
        let array = ['#B73D19',
        '#E7E41C',
        '#4CD10A',
        '#23A547',
        '#24AD81',
        '#2473AD',
        '#2433AD',
        '#1C818F',
        '#280D97',
        '#8C1D87'];
        expect(array).toContain(arrayColorProvider.getRandomColor(array));

    });
    it("must return a background color", function(){
        let backgrounds = [
            'color-background-1',
            'color-background-2', 
            'color-background-3',
            'color-background-4',
            'color-background-5'
        ];
        let arrayColorProvider: ArrayColorProvider;
        arrayColorProvider = new ArrayColorProvider();
        expect(backgrounds).toContain(arrayColorProvider.getRandomBackgroundColor(backgrounds));
    });

});
