export class Categories {
    static categories: Array<{id: number, name: string}> =[
        {id: 1, name: 'ALMACEN'},
        {id: 2, name: 'VERDULERIA'},
        {id: 3, name: 'FRESCOS'},
        {id: 4, name: 'OTROS' }
    ];

    static getCategories(){
        return this.categories;
    }

    static getCategoryById(id:number){
        for(let category in this.categories){
            if(this.categories[category].id===id){
                return this.categories[category];
            }
        } 
        return null;
    }


}