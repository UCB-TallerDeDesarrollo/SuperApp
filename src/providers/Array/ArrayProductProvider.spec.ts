import { ArrayProductProvider } from './ArrayProductProvider';
describe("Test ArrayProductProvider static functions", function() {
    let arrayProductProvider: ArrayProductProvider;
    beforeEach(function() {
        arrayProductProvider = new ArrayProductProvider();
    });
    it("must return the actual level", function() {
       expect(arrayProductProvider.getActualLevel()).toBe(1)
    });
    it("must increment the level", function() {
        arrayProductProvider.nextLevel()
        expect(arrayProductProvider.getActualLevel()).toBe(2)
    });
    

});
