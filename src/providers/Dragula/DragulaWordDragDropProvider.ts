import { WordDragDropProvider } from '../../shared/providers/WordDragDropProvider';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';
import { Platform } from 'ionic-angular';

const SIZE_LETTER_WIDTH=45;
const SIZE_LETTER_HEIGHT=45;
const SIZE_NAVIGATION = 56;

const SIZE_LETTER_HEIGHT_ANDROID=21;

const LIMIT_RIGTH: number = document.body.clientWidth - SIZE_LETTER_WIDTH;
const LIMIT_TOP: number = document.body.clientHeight - SIZE_LETTER_HEIGHT_ANDROID;

export class DragulaWordDragDropProvider implements WordDragDropProvider {

    private subs: {[key: string]: Subscription} = {};
    private actualSelectedElement   : any;
    private actualSelectedContainer : any;
    private recentlyMove   : boolean;
    private :Position;
    public constructor(private dragulaService: DragulaService, private platform: Platform) {

     }
    
    public initialize(selectorName: string): void {
        this.subs[selectorName] = new Subscription();
        this.recentlyMove = false;
        this.dragulaService.createGroup(selectorName, { 
            revertOnSpill: true,
            ignoreInputTextSelection: false,
            direction: 'mixed',
            moves: (el, container, handle) => {
                return !(container.children.length > 0 && container.children[0].classList.contains('no-move'));
            },
            accepts: (el, target, source, sibling) => {
                if(!target.classList.contains('objetive-container')) {
                    return false;
                }
                if(target.children.length > 0) {
                    return target.children[0].classList.contains('gu-transit');
                }
                if(target.classList[0] !== source.classList[0]) {
                    return false;
                }
                return true;
            }
        });
    }

    public startEvents(selectorName: string, wordPage: any): void {
        const MARGIN_LEFT : number = 4;

        this.subs[selectorName].add(this.dragulaService.drag(selectorName).subscribe(({ name, el, source }) => {
            this.actualSelectedContainer = source;
        }));

        this.subs[selectorName].add(this.dragulaService.drop(selectorName).subscribe(({ el, target, source, sibling }) => {
            el.setAttribute('style', `top: 0px;left: 0px;border: initial;background-color: initial;`);
            el.classList.add('no-move');
            this.recentlyMove = true;
            wordPage.showEndView();
        }));

        this.subs[selectorName].add(this.dragulaService.dragend(selectorName).subscribe(({ name, el }) => {
            if(!this.recentlyMove) {
                let { posLeftActual, posTopActual } = this.getFixedPosition();
                let posLeft = posLeftActual - parseFloat(this.offset(this.actualSelectedContainer).left) - MARGIN_LEFT;
                let posTop = posTopActual - parseFloat(this.offset(this.actualSelectedContainer).top);
                el.setAttribute('style', `top: ${posTop}px;left: ${posLeft}px;`);
            }
            this.recentlyMove = false;
        }));

        this.subs[selectorName].add(this.dragulaService.cloned(selectorName).subscribe(({ clone, original, cloneType }) => {
            this.actualSelectedElement = clone;
        }));
    }

    private getFixedPosition() {

        let posLeftActual = parseFloat(this.actualSelectedElement.style.left);
        let posTopActual = parseFloat(this.actualSelectedElement.style.top);
        posLeftActual = this.getLeftPositionFixed(posLeftActual);
        posTopActual = this.getTopPositionFixed(posTopActual);
        return { posLeftActual, posTopActual };
    }

    public finalize(selectorName: string): void {
        this.subs[selectorName].unsubscribe();
        this.subs[selectorName] = undefined;
        this.dragulaService.destroy(selectorName);
    }

    private offset(el) {
        let rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }
    private getTopPositionFixed(posTopActual: number) {
        if (posTopActual < SIZE_NAVIGATION) {
            posTopActual = SIZE_NAVIGATION;
        }
        if (posTopActual > LIMIT_TOP) {
            posTopActual = LIMIT_TOP;
        }
        return posTopActual;
    }
    
    private getLeftPositionFixed(posLeftActual: number) {
        if (posLeftActual < 0) {
            posLeftActual = 0;
        }
        if (posLeftActual > LIMIT_RIGTH) {
            posLeftActual = LIMIT_RIGTH;
        }
        return posLeftActual;
    }
    
}


