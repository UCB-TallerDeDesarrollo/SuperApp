import { Coordinate } from './Coordinate';
import { Platform } from 'ionic-angular';

export class SupermarketLimits {
    
    sizes: Coordinate;
    SIZE_LETTER_WIDTH: number;
    SIZE_LETTER_HEIGHT_ANDROID: number;
    SIZE_LETTER_HEIGHT_OTHER: number;
    SIZE_LETTER_HEIGHT_IOS: number;
    SIZE_NAVIGATION: number = 78;
    SIZE_LETTER_HEIGHT_ANDROID_OTHER: number;
    SIZE_LETTER_HEIGHT_IOS_OTHER: number;

    constructor(platform:Platform) {
        this.setupSizes(platform);
    }

    private setupSizes(platform: Platform) {
        let x: number, y: number;
        x = platform.width();
        y = platform.height();

        let blockWidth = 70;
        let blockHeight = 70;
        
        if(x <= 1367) {
            blockWidth = 141;
            blockHeight = 122;
        }
        if(x <= 1024) {
            blockWidth = 106;
            blockHeight = 105;
        }
        if(x <= 824) {
            blockWidth = 67;
            blockHeight = 60;
        }
        if(x <= 668) {
            blockWidth = 70;
            blockHeight = 60;
        }
        if(x <= 640) {
            blockWidth = 70;
            blockHeight = 60;
        }
        if(x <= 568) {
            blockWidth = 60;
            blockHeight = 50;
        }

        this.SIZE_LETTER_WIDTH = blockWidth;
        this.SIZE_LETTER_HEIGHT_ANDROID = blockHeight;
        this.SIZE_LETTER_HEIGHT_OTHER = this.SIZE_LETTER_HEIGHT_ANDROID;
        this.SIZE_LETTER_HEIGHT_IOS = blockHeight;
        
        if (platform.is("mobileweb")) {
            y -= this.SIZE_LETTER_HEIGHT_OTHER;
        }
        else if (platform.is("android")) {
            y -= this.SIZE_LETTER_HEIGHT_ANDROID;
        }
        else if (platform.is("ios")) {
            y -= this.SIZE_LETTER_HEIGHT_IOS;
        }
        x -= this.SIZE_LETTER_WIDTH;
        this.sizes = new Coordinate(x, y);
    }

    public getAxisFixed(topPosition:number, leftPosition:number){
        let axis:Coordinate;
        axis=new Coordinate(this.getLeftPositionFixed(leftPosition), this.getTopPositionFixed(topPosition));
        return axis;
    }

    private getTopPositionFixed(posTopActual: number) {
        if (posTopActual < this.SIZE_NAVIGATION) {
            posTopActual = this.SIZE_NAVIGATION;
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