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

});
