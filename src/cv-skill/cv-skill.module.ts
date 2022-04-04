import { Module } from '@nestjs/common';
import { CvSkillService } from './cv-skill.service';
import { CvSkillController } from './cv-skill.controller';

@Module({
  controllers: [CvSkillController],
  providers: [CvSkillService]
})
export class CvSkillModule {}
