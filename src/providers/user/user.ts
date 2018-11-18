import { CategoryProvider } from './../category/category';
import { ProductsProvider } from './../product/product';
import { UserProgress } from './../../entities/userProgress';
import { Injectable, Component } from '@angular/core';
import { User as UserEntity, User } from '../../entities/user';
//import { User as UserModel } from '../../shared/models/User.model';
import { getRepository, Repository } from 'typeorm';
import { LoginStatus } from '../login/LoginStatus';
import { Categories } from '../FakeService/Categories';
import { Category } from '../../entities/category';
import { FakeProducts } from '../FakeService/FakeProducts';
import { Product } from '../../entities/product';


@Injectable()
export class UserProvider {
    
 
    private userRepository: Repository<UserEntity>;
    private progress: Repository<UserProgress>;
    constructor(public productsProvider: ProductsProvider,
                public categoryProvider: CategoryProvider) {
        this.userRepository = getRepository('user') as Repository<UserEntity>;
        this.progress = getRepository('user_progress') as Repository<UserProgress>;
    }

    async saveUser(userEntity: UserEntity) {

        await this.userRepository.save(userEntity);
        let progressUser=userEntity.userProgress;
        progressUser.userId=userEntity.id;
        await this.progress.save(progressUser);
        this.getUserByUsername(userEntity.username)
        .then(user => {
            (async() => {await this.productsAndCategoriesInitializer(user.id)})();
        }).catch(error => {
            console.error(error);
        });
    }

    async getUserByUsername(user_username: string) {
        let userEntity = await this.userRepository.createQueryBuilder('user')
                                                  .where('username = :username', { username: user_username })
                                                  .getOne();
        let progress = await this.progress.createQueryBuilder('user_progress')
                                                  .where('userId = :userId', { userId: userEntity.id })
                                                  .getOne();                                         
        userEntity.userProgress=progress;
        return userEntity;
    }

    async updateUser(userModel: UserEntity) {
        await this.userRepository.createQueryBuilder()
                                 .update('user')
                                 .set({ username: userModel.username, birthdate: userModel.birthdate, profilePictureURL: userModel.profilePictureURL })
                                 .where('id = :id', { id: userModel.id })
                                 .execute();
    }

    async deleteUser(userModel: UserEntity) {
        await this.userRepository.delete(userModel.id);
    }
   async deleteUserByUserName(username:string)
    {
        var user=await this.getUserByUsername(username);
        await this.deleteUser(user);
    }
    async countUsers() {
        let count = await this.userRepository.createQueryBuilder('user')
                                             .orderBy('user.id', 'ASC')
                                             .getCount();
    
        return count;
    }
    async updateProgress(level:number, isBuy:boolean)
    {
        let userInfo:string=LoginStatus.username;
        let user=await this.getUserByUsername(userInfo);
        user.userProgress.nextLevel(level, isBuy);
        await this.saveUser(user);
    }
    async updateProgressSuper(level:number)
    {
        let userInfo:string=LoginStatus.username;
        let user=await this.getUserByUsername(userInfo);
        user.userProgress.nextLevelSuper(level);
        await this.saveUser(user);
    } 

    async existsUsername(user_username: string) {
        let count = await this.userRepository.createQueryBuilder('user')
                                             .where('username = :username', { username: user_username })
                                             .getCount();
        
        return count != 0;
    }
    async prepareAnonimusUser() {
        let exist:boolean=await this.existsUsername("anonimus");
        if (!exist)
        {
            let user:User=new User("anonimus", new Date(), "assets/imgs/user.png");
            await this.saveUser(user);
        }
    }
    async getAmountOfCoins(){
        let userInfo:string=LoginStatus.username;
        let user=await this.getUserByUsername(userInfo);
        return user.userProgress.coins;
    }
    async updateCoins(){
        let userInfo:string=LoginStatus.username;
        let user=await this.getUserByUsername(userInfo);
        user.userProgress.updateCoins();
        await this.saveUser(user);
    }
    async buyLevel(){
        let userInfo:string=LoginStatus.username;
        let user=await this.getUserByUsername(userInfo);
        user.userProgress.buyLevel();
        await this.saveUser(user);
    }


  async productsAndCategoriesInitializer(user_id: number) {
    const count_category = await this.categoryProvider.countCategories(user_id);
    if(count_category == 0) {
      let categories = Categories.getCategories();
      for(const c in categories) {
        let category = new Category();
        category.name = categories[c].name;
        category.user_id = user_id;
        this.categoryProvider.saveCategory(category)
        .then(response => {
          if(response) {
            this.categoryProvider.getCategoryByNameAndUserId(category.name, user_id)
            .then(currentCategory => {
              let products = FakeProducts.getProducts()
              for (const p in products) {
                if(currentCategory.name === Categories.getCategoryById(products[p].categoryId).name) {
                  let product = new Product();
                  product.image = products[p].image;
                  product.state = 1;
                  product.audio = " ";
                  product.title = products[p].title;
                  product.category_id = currentCategory.id;
                  this.productsProvider.saveProduct(product)
                  .then(response => {
                    if(!response) console.error("Inconsistent product information");
                  }).catch(error => {
                    console.error(error);
                  });
                }
              }
            })
          }
        }).catch(error => {
          console.error(error);
        });
      }
    }
  }
}