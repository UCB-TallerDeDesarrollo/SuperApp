import { ArrayManager } from './ArrayManager';
export class ColorsManager{
    static style_colors:string[]=
    ["color-background-1",
     "color-background-2", 
     "color-background-3",
     "color-background-4",
     "color-background-5"];

     static get_color_style()
     {
         return ArrayManager.get_random_element(this.style_colors);
     }
}