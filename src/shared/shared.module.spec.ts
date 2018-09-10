import { SharedModule } from './shared.module';

describe('Test SharedModule constructor', function() {
    let sharedModule: SharedModule;

    beforeEach(function() {
        sharedModule = new SharedModule();
    });

    it('Constructor must create a SharedModule', function() {
        expect(sharedModule).toBeTruthy();
    });
});
