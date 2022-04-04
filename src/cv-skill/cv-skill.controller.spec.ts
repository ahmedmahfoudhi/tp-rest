import { Test, TestingModule } from '@nestjs/testing';
import { CvSkillController } from './cv-skill.controller';
import { CvSkillService } from './cv-skill.service';

describe('CvSkillController', () => {
  let controller: CvSkillController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CvSkillController],
      providers: [CvSkillService],
    }).compile();

    controller = module.get<CvSkillController>(CvSkillController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
