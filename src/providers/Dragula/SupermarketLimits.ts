import { Coordinate } from './Coordinate';
import { Platform } from 'ionic-angular';

const SIZE_LETTER_WIDTH = 70;
const SIZE_LETTER_HEIGHT_ANDROID = 60 - 24;
const SIZE_LETTER_HEIGHT_OTHER = SIZE_LETTER_HEIGHT_ANDROID+3;
const SIZE_LETTER_HEIGHT_IOS = 60 - 24;
const SIZE_NAVIGATION = 78;

export class SupermarketLimits{
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
        if (platform.is("mobileweb")) {
            y -= SIZE_LETTER_HEIGHT_OTHER;
        }
        x -= SIZE_LETTER_WIDTH;
        this.sizes = new Coordinate(x, y);
    }

    public getAxisFixed(topPosition:number, leftPosition:number)
    {
        let axis:Coordinate;
        axis=new Coordinate(this.getLeftPositionFixed(leftPosition), this.getTopPositionFixed(topPosition));
        return axis;
    }

    private getTopPositionFixed(posTopActual: number) {
        if (posTopActual < SIZE_NAVIGATION) {
            posTopActual = SIZE_NAVIGATION;
        }
        if (posTopActual > this.sizes.axis_y) {
            posTopActual = this.sizes.axis_y;
        }
        return posTopActual;
    }

    private getLeftPositionFixed(posLeftActual: number) {
        if (posLeftActual < 0) {
            posLeftActual = 0;
        }
        if (posLeftActual > this.sizes.axis_x) {
            posLeftActual = this.sizes.axis_x;
        }
        return posLeftActual;
    }
}