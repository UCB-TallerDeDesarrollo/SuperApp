import { Injectable } from '@angular/core';
import { User as UserEntity } from '../../entities/user';
import { User as UserModel } from '../../shared/models/User.model';
import { getRepository, Repository } from 'typeorm';

@Injectable()
export class UserProvider {
    private userRepository: any;

    constructor() {
        this.userRepository = getRepository('user') as Repository<UserEntity>;
    }

    async saveUser(userModel: UserModel) {
        const userEntity = new UserEntity();

        userEntity.id = userModel.Id;
        userEntity.username = userModel.Username;
        userEntity.birthdate = userModel.Birthdate;
        userEntity.profilePictureURL = userModel.ProfilePictureURL;

        await this.userRepository.save(userEntity);
    }

    async getUserByUsername(user_username: string) {
        let userEntity = await this.userRepository.createQueryBuilder('user')
                                                  .where('username = :username', { username: user_username })
                                                  .getOne();

        let userModel = UserModel.createUser(userEntity.id, userEntity.username, userEntity.birthdate, userEntity.profilePictureURL);

        return userModel;
    }

    async updateUser(userModel: UserModel) {
        await this.userRepository.createQueryBuilder()
                                 .update('user')
                                 .set({ username: userModel.Username, birthdate: userModel.Birthdate, profilePictureURL: userModel.ProfilePictureURL })
                                 .where('id = :id', { id: userModel.Id })
                                 .execute();
    }

    async deleteUser(userModel: UserModel) {
        await this.userRepository.removeById(userModel.Id);
    }
}