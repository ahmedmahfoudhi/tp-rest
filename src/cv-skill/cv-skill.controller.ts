import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CvSkillService } from './cv-skill.service';
import { CreateCvSkillDto } from './dto/create-cv-skill.dto';
import { UpdateCvSkillDto } from './dto/update-cv-skill.dto';

@Controller('cv-skill')
export class CvSkillController {
  constructor(private readonly cvSkillService: CvSkillService) {}

  @Post()
  create(@Body() createCvSkillDto: CreateCvSkillDto) {
    return this.cvSkillService.create(createCvSkillDto);
  }

  @Get()
  findAll() {
    return this.cvSkillService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cvSkillService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCvSkillDto: UpdateCvSkillDto) {
    return this.cvSkillService.update(+id, updateCvSkillDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cvSkillService.remove(+id);
  }
}
