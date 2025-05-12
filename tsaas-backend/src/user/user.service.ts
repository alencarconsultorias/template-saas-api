import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    findAll() {
        return ['User1', 'User2'];
    }
} 