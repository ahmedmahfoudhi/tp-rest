import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private userRepository:Repository<User>){}

  async create(createUserDto: CreateUserDto) {
    // return 'This action adds a new user';
    return await this.userRepository.save(createUserDto);

  }

  async findAll() {
    // return `This action returns all user`;
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    // return `This action returns a #${id} user`;
    return await this.userRepository.findOneBy({id});
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    // return `This action updates a #${id} user`;
    const user = await this.userRepository.preload({id,...updateUserDto});
    if(!user) throw new NotFoundException(`user with id ${id} does not exist`);
    return await this.userRepository.save(user);
  }

  async remove(id: string) {
    // return `This action removes a #${id} user`;
    const result = await this.userRepository.softDelete({id});
    if(!result.affected) throw new NotFoundException(`user with id ${id} does not exist`);
    return result;
  }
}
