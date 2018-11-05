import { UserProgress } from './../../entities/userProgress';
import { Injectable, Component } from '@angular/core';
import { User as UserEntity, User } from '../../entities/user';
//import { User as UserModel } from '../../shared/models/User.model';
import { getRepository, Repository } from 'typeorm';
import { LoginStatus } from '../login/LoginStatus';


@Injectable()
export class UserProvider {
 
    private userRepository: Repository<UserEntity>;
    private progress: Repository<UserProgress>;
    constructor() {
        this.userRepository = getRepository('user') as Repository<UserEntity>;
        this.progress = getRepository('user_progress') as Repository<UserProgress>;
    }

    async saveUser(userEntity: UserEntity) {

        await this.userRepository.save(userEntity);
        let progressUser=userEntity.userProgress;
        progressUser.userId=userEntity.id;
        await this.progress.save(progressUser);
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
    async updateProgress(level:number)
    {
        let userInfo:string=LoginStatus.username;
        let user=await this.getUserByUsername(userInfo);
        user.userProgress.nextLevel(level);
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
    async updateCoins(coins:number){
        let userInfo:string=LoginStatus.username;
        let user=await this.getUserByUsername(userInfo);
        user.userProgress.updateCoins(coins);
        await this.saveUser(user);
    }
}