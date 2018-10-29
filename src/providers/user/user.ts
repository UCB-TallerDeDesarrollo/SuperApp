import { Injectable, Component } from '@angular/core';
import { User as UserEntity, User } from '../../entities/user';
//import { User as UserModel } from '../../shared/models/User.model';
import { getRepository, Repository } from 'typeorm';

@Injectable()
export class UserProvider {
 
    private userRepository: Repository<UserEntity>;

    constructor() {
        this.userRepository = getRepository('user') as Repository<UserEntity>;
    }

    async saveUser(userEntity: UserEntity) {

        await this.userRepository.save(userEntity);
    }

    async getUserByUsername(user_username: string) {
        let userEntity = await this.userRepository.createQueryBuilder('user')
                                                  .where('username = :username', { username: user_username })
                                                  .getOne();

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
            let user:User=new User("anonimus", new Date(), "");
            await this.userRepository.save(user);
        }
      }
}