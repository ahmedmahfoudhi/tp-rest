import { Test, TestingModule } from '@nestjs/testing';
import { CvSkillService } from './cv-skill.service';

describe('CvSkillService', () => {
  let service: CvSkillService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CvSkillService],
    }).compile();

    service = module.get<CvSkillService>(CvSkillService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
