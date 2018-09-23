import { ArrayProductProvider } from './ArrayProductProvider';
describe("Test ArrayProductProvider static functions", function() {
    let arrayProductProvider: ArrayProductProvider;
    beforeEach(function() {
        arrayProductProvider = new ArrayProductProvider();
    });
    it("must return the actual level", function() {
       expect(arrayProductProvider.getActualLevel()).toBe(1)
    });
    it("must increment the level in 1", function() {
        arrayProductProvider.nextLevel()
        expect(arrayProductProvider.getActualLevel()).toBe(2)
    });
    it("must set the actual level", function() {
        arrayProductProvider.setLevel(5)
        expect(arrayProductProvider.getActualLevel()).toBe(5)
    });
    it("must return the initial level", function() {
        expect(arrayProductProvider.Continue()).toBe(1)
    });
    it("must return quantity of products", function() {
        expect(arrayProductProvider.getQuantityOfProducts()).toBe(60)
    });
    
    

});
