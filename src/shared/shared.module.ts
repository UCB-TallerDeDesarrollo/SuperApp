import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortWordGame } from './models/sortWordGame.model';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        SortWordGame
    ],
    exports: [
        SortWordGame
    ]
})
export class SharedModule { }
