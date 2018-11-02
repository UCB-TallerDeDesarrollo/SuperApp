import { SupermarketDragDropProvider } from '../../shared/providers/SupermarketDragDropProvider';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';
import { Platform } from 'ionic-angular';
import { Coordinate } from './Coordinate';
import { SupermarketLimits } from './SupermarketLimits';


export class DragulaSupermarketDragDropProvider implements SupermarketDragDropProvider {

    private subs: {[key: string]: Subscription} = {};
    private actualSelectedElement   : any;
    private actualSelectedContainer : any;
    private recentlyMove   : boolean;
    private limits: SupermarketLimits;
    private doAction: boolean;

    public constructor(
        private dragulaService: DragulaService, 
        platform: Platform
    ) {
        this.limits = new SupermarketLimits(platform);
        this.doAction = false;
    }
    
    public initialize(selectorName: string, supermarketPage: any): void {
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
                if(!target.classList.contains('product-objetive-container')) {
                    return false;
                }
                if(!supermarketPage.getProductsList().includes(source.id)) {
                    this.doAction = true;
                    return true;
                }
                return true;
            }
        });
    }

    objetotemporal: any;
    wasSelected = { value: false };

    public startEvents(selectorName: string, supermarketPage: any): void {
        const MARGIN_LEFT : number = 0;

        this.subs[selectorName].add(this.dragulaService.drag(selectorName).subscribe(({ name, el, source }) => {
            this.actualSelectedContainer = source;
            this.wasSelected.value = true;
        }));

        this.subs[selectorName].add(this.dragulaService.out(selectorName).subscribe(({ el, container }) => {
            this.doAction = false;
            
        }));

        this.subs[selectorName].add(this.dragulaService.drop(selectorName).subscribe(({ el, target, source, sibling }) => {
            if(this.doAction) {
                this.dragulaService.find(selectorName).drake.cancel(true);
                this.recentlyMove = false;
                this.objetotemporal = el;
            }
            else {
                el.setAttribute('style', `display: none;`);
                document.getElementById(`img-${source.id}`).setAttribute('style', `visibility: visible;`);
                el.classList.add('no-move');
                this.recentlyMove = true;
                supermarketPage.showEndView(el);
            }
        }));

        this.subs[selectorName].add(this.dragulaService.dragend(selectorName).subscribe(({ name, el }) => {
            if(!this.recentlyMove) {
                let { posLeftActual, posTopActual } = this.getFixedPosition();
                let posLeft = posLeftActual - parseFloat(this.offset(this.actualSelectedContainer).left) - MARGIN_LEFT;
                let posTop = posTopActual - parseFloat(this.offset(this.actualSelectedContainer).top);
                if(el != undefined) {
                    el.setAttribute('style', `top: ${posTop}px;left: ${posLeft}px;`);
                }
                else {
                    this.wasSelected.value = false;
                    let wasSelected = this.wasSelected;
                    const DELTA = 3;
                    let objetoTemporal = this.objetotemporal;
                    let initialX = Number(objetoTemporal.style.left.substr(0, objetoTemporal.style.left.length - 2));
                    let initialY = Number(objetoTemporal.style.top.substr(0, objetoTemporal.style.top.length - 2));
                    let operation = function(x) {
                        return (x / initialX) * initialY;
                    }
                    let myVar = setInterval(() => {
                        let x = Number(objetoTemporal.style.left.substr(0, objetoTemporal.style.left.length - 2));
                        x -= DELTA;
                        if(x < 0) {
                            x = 0;
                        }
                        objetoTemporal.setAttribute('style', `top: ${operation(x)}px;left: ${x}px;`);
                        if(x <= 0 || wasSelected.value) {
                            clearInterval(myVar);
                        }
                    }, 10);
                }
            }
            this.doAction = false;
            this.recentlyMove = false;
        }));

        this.subs[selectorName].add(this.dragulaService.cloned(selectorName).subscribe(({ clone, original, cloneType }) => {
            this.actualSelectedElement = clone;
        }));
    }

    private getFixedPosition() {
        let posLeftActual = parseFloat(this.actualSelectedElement.style.left);
        let posTopActual = parseFloat(this.actualSelectedElement.style.top);
        let position:Coordinate=this.limits.getAxisFixed(posTopActual, posLeftActual);
        posLeftActual = position.axis_x;
        posTopActual = position.axis_y;
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

}
