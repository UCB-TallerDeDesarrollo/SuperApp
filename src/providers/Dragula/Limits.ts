import { Coordinate } from './Coordinate';
import { Platform } from 'ionic-angular';

const SIZE_LETTER_WIDTH=45;
const SIZE_LETTER_HEIGHT_ANDROID=21;
const SIZE_LETTER_HEIGHT_OTHER=45;
const SIZE_LETTER_HEIGHT_IOS=21;

export class Limits{
    sizes:Coordinate;
    constructor(platform:Platform)
    {
        this.setupSizes(platform);
    }

    private setupSizes(platform: Platform) {
        let x: number, y: number;
        x = platform.width();
        y = platform.height();
        if (platform.is("android")) {
            y -= SIZE_LETTER_HEIGHT_ANDROID;
        }
        if (platform.is("ios")) {
            y -= SIZE_LETTER_HEIGHT_IOS;
        }
        else {
            y -= SIZE_LETTER_HEIGHT_OTHER;
        }
        x -= SIZE_LETTER_WIDTH;
        this.sizes = new Coordinate(x, y);
    }
}