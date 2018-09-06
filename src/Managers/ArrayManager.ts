export class ArrayManager {

    static get_random_element(array:string[]) {
        let index = this.random_int(0, array.length - 1);
        return array[index];   
    }

    static random_int(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}
