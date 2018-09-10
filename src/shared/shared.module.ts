import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortWordGame } from './models/sortWordGame.model';
import { Product } from './models/product.model';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        SortWordGame,
        Product
    ],
    exports: [
        SortWordGame,
        Product
    ]
})
export class SharedModule { }
