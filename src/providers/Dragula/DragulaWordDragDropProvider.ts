import { WordDragDropProvider } from '../../shared/providers/WordDragDropProvider';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';

export class DragulaWordDragDropProvider implements WordDragDropProvider {

    private subs: {[key: string]: Subscription} = {};
    private actualSelectedElement   : any;
    private actualSelectedContainer : any;
    private recentlyMove   : boolean;

    public constructor(private dragulaService: DragulaService) { }
    
    public initialize(selectorName: string): void {
        this.subs[selectorName] = new Subscription();
        this.recentlyMove = false;
        this.dragulaService.createGroup(selectorName, {
            revertOnSpill: true,
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
                let posLeftActual= parseFloat(this.actualSelectedElement.style.left);
                let posTopActual=parseFloat(this.actualSelectedElement.style.top);
                let limitRigth=document.body.clientWidth-45;
                let limitTop=document.body.clientHeight-45;
                if (posLeftActual<0)
                {
                    posLeftActual=0;
                }
                if (posLeftActual>limitRigth)
                {
                    posLeftActual=limitRigth;
                }
                if (posTopActual<56)
                {
                    posTopActual=56;
                }
                if (posTopActual>limitTop)
                {
                    posTopActual=limitTop;
                }
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
}
