export class ArrayManager {

    static get_random_element(array:any[]) {
        let index = this.random_int(0, array.length - 1);
        return array[index];   
    }

    static random_int(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static getManyRandomElements(numberOfElements:number,array:any[]){ 
        let elements:any = [];
        let count = 0; 
        while(count<numberOfElements){
            let randomElement=this.get_random_element(array);
            if(elements.indexOf(randomElement) === -1){
                elements.push(randomElement);
                count++;
            }
        }
        return elements;
    }

    static getWrongElements(bigArray:any[],littleArray:any[]){
        let elements:any = [];
        for (let element of bigArray) {
            if(littleArray.indexOf(element) === -1){
                elements.push(element);
            }
        }
        return elements;
    }

}
