import { PartialType } from '@nestjs/mapped-types';
import { CreateCvSkillDto } from './create-cv-skill.dto';

export class UpdateCvSkillDto extends PartialType(CreateCvSkillDto) {}
