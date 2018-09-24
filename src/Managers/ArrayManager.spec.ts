import { ArrayManager } from './ArrayManager';

describe("Test ArrayManager static functions", function() {
    
    it("ArrayManager must return a number from the array", function() {
        let array = [1, 2, 3, 4, 5];
        expect(array).toContain(ArrayManager.get_random_element(array));
        expect(array).toContain(ArrayManager.get_random_element(array));
        expect(array).toContain(ArrayManager.get_random_element(array));
    });

});
