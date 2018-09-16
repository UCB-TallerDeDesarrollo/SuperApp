import { WordDragDropProvider } from '../../shared/providers/WordDragDropProvider';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';

export class DragulaWordDragDropProvider implements WordDragDropProvider {

    private subs: Subscription = new Subscription();
    private selectorName: string;
    private actualSelectedElement   : any;
    private actualSelectedContainer : any;
    private recentlyMove   : boolean;

    public constructor(private dragulaService: DragulaService) { }
    
    public initialize(selectorName: string): void {
        this.selectorName = selectorName;
        this.dragulaService.createGroup(this.selectorName, {
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

    public startEvents(dropCallBack: any): void {
        const MARGIN_LEFT : number = 4;
        this.subs.add(this.dragulaService.drag(this.selectorName).subscribe(({ name, el, source }) => {
            this.actualSelectedContainer = source;
        }));

        this.subs.add(this.dragulaService.drop(this.selectorName).subscribe(({ el, target, source, sibling }) => {
            el.setAttribute('style', `top: 0px;left: 0px;border: initial;background-color: initial;`);
            el.classList.add('no-move');
            this.recentlyMove = true;
            dropCallBack();
        }));

        this.subs.add(this.dragulaService.dragend(this.selectorName).subscribe(({ name, el }) => {
            if(!this.recentlyMove) {
                let posLeft = parseFloat(this.actualSelectedElement.style.left) - parseFloat(this.offset(this.actualSelectedContainer).left) - MARGIN_LEFT;
                let posTop = parseFloat(this.actualSelectedElement.style.top) - parseFloat(this.offset(this.actualSelectedContainer).top);
                el.setAttribute('style', `top: ${posTop}px;left: ${posLeft}px;`);
            }
            this.recentlyMove = false;
        }));

        this.subs.add(this.dragulaService.cloned(this.selectorName).subscribe(({ clone, original, cloneType }) => {
            this.actualSelectedElement = clone;
        }));
    }

    public finalize(): void {
        this.subs.unsubscribe();
        this.dragulaService.destroy(this.selectorName);
    }

    private offset(el) {
        let rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }
}
