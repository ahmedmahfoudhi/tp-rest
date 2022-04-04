import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {User} from './entities/user.entity'

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    // return 'This action adds a new user';
    return this.userRepository.save(createUserDto);
  }

  findAll() {

    // return `This action returns all user`;
    return this.userRepository.find();
  }

  async findOne(id: number) {
    // return `This action returns a #${id} user`;
    const result = await this.userRepository.restore(id);
    if (result.affected) {
      return result;
    }
    throw new NotFoundException(`user d'id ${id} n'existe pas `);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    // return `This action updates a #${id} user`;
    const newUser = await this.userRepository.preload({ id, ...updateUserDto });
    if (newUser) {
      return this.userRepository.save(newUser);
    } else {
      throw new NotFoundException(` user d'id ${id} n'existe pas `);
    }
  }

  async remove(id: number) {
    // return `This action removes a #${id} user`;
    const result = await this.userRepository.delete(id);
    if (result.affected) {
      return result;
    }
    throw new NotFoundException(`User d'id ${id} n'existe pas `);
  }
}
