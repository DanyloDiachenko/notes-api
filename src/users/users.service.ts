import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { UserEntity } from "./entities/user.entity";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async createUser(email: string, password: string): Promise<UserEntity> {
        const passwordHash = await bcrypt.hash(password, 10);
        const user = this.userRepository.create({ email, passwordHash });
        return this.userRepository.save(user);
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        return this.userRepository.findOne({ where: { email } });
    }

    async validatePassword(
        password: string,
        passwordHash: string,
    ): Promise<boolean> {
        return bcrypt.compare(password, passwordHash);
    }
}
