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
}