import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Skill } from './entities/skill.entity';

@Injectable()
export class SkillService {

  constructor(@InjectRepository(Skill) private skillRepository:Repository<Skill>){}

  async create(createSkillDto: CreateSkillDto) {
    // return 'This action adds a new skill';
    return this.skillRepository.save(createSkillDto);
  }

  async findAll() {
    // return `This action returns all skill`;
    return await this.skillRepository.find();
  }

  async findOne(id: string) {
    // return `This action returns a #${id} skill`;
    return await this.skillRepository.findOneBy({id});
  }

  async update(id: string, updateSkillDto: UpdateSkillDto) {
    // return `This action updates a #${id} skill`;
    const skill = await this.skillRepository.preload({id,...updateSkillDto});
    if(!skill) throw new NotFoundException(`skill with id ${id} does not exist`);
    return await this.skillRepository.save(skill);
  }

  async remove(id: string) {
    // return `This action removes a #${id} skill`;
    const result = await this.skillRepository.softDelete(id);
    if(!result.affected) throw new NotFoundException(`skill with id ${id} does not exist`);
    return result;
  }
}
