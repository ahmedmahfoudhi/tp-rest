import { Injectable } from '@nestjs/common';
import { CreateCvSkillDto } from './dto/create-cv-skill.dto';
import { UpdateCvSkillDto } from './dto/update-cv-skill.dto';

@Injectable()
export class CvSkillService {
  create(createCvSkillDto: CreateCvSkillDto) {
    return 'This action adds a new cvSkill';
  }

  findAll() {
    return `This action returns all cvSkill`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cvSkill`;
  }

  update(id: number, updateCvSkillDto: UpdateCvSkillDto) {
    return `This action updates a #${id} cvSkill`;
  }

  remove(id: number) {
    return `This action removes a #${id} cvSkill`;
  }
}
