import { ArrayProductProvider } from './ArrayProductProvider';
describe("Test ArrayProductProvider static functions", function() {
    let arrayProductProvider: ArrayProductProvider;
    beforeEach(function() {
        arrayProductProvider = new ArrayProductProvider();
    });
    it("must return the actual level", function() {
       expect(arrayProductProvider.getActualLevel()).toBe(1)
    });

});
