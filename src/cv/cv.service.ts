import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { Cv } from './entities/cv.entity';

@Injectable()
export class CvService {

  constructor(@InjectRepository(Cv) private cvRepository:Repository<Cv>){}

  async create(createCvDto: CreateCvDto):Promise<Cv> {
    // return 'This action adds a new cv';
    return await this.cvRepository.save(createCvDto);

    
  }

  async findAll():Promise<Cv[]> {
    // return `This action returns all cv`;
    return await this.cvRepository.find();
  }

  async findOne(id: string) :Promise<Cv>{
    // return `This action returns a #${id} cv`;
    return await this.cvRepository.findOneBy({id});
  }

  async update(id: string, updateCvDto: UpdateCvDto) :Promise<Cv>{
    const cv = await this.cvRepository.preload({id,...updateCvDto});
    if(!cv){
      throw new NotFoundException(`cv with id ${id} does not exist`);
    }
    return await this.cvRepository.save(cv);
  }

  async remove(id: string) {
    // return `This action removes a #${id} cv`;
    const result = await this.cvRepository.softDelete(id);
    if(!result.affected){
      throw new NotFoundException(`cv with id ${id} does not exist`);
    }
    return result;

  }
}
