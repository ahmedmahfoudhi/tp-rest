import { Injectable, NotFoundException } from '@nestjs/common';
import { Like, Repository } from "typeorm";
import { TodoEntity } from './Entity/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateTodoDto } from './update-todo.dto';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { SearchTodoDto } from './dto/search-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}
  addTodo(todo: Partial<TodoEntity>): Promise<TodoEntity> {
    return this.todoRepository.save(todo);
  }

  async updateTodo(
    updateTodoDto: UpdateTodoDto,
    id: string,
  ): Promise<TodoEntity> {
    const newTodo = await this.todoRepository.preload({ id, ...updateTodoDto });
    if (newTodo) {
      return this.todoRepository.save(newTodo);
    } else {
      throw new NotFoundException(`Le todo d'id ${id} n'existe pas `);
    }
  }

  async deleteTodo(id: string): Promise<DeleteResult> {
    const result = await this.todoRepository.delete(id);
    if (result.affected) {
      return result;
    }
    throw new NotFoundException(`Le todo d'id ${id} n'existe pas `);
  }
  async softDeleteTodo(id: string): Promise<UpdateResult> {
    const result = await this.todoRepository.softDelete(id);
    if (result.affected) {
      return result;
    }
    throw new NotFoundException(`Le todo d'id ${id} n'existe pas `);
  }

  async softRestoreTodo(id: string) {
    const result = await this.todoRepository.restore(id);
    if (result.affected) {
      return result;
    }
    throw new NotFoundException(`Le todo d'id ${id} n'existe pas `);
  }

  findAll(searchTodoDto: SearchTodoDto): Promise<TodoEntity[]> {
    const criterias = [];
    if (searchTodoDto.status) {
      criterias.push({ status: searchTodoDto.status });
    }
    
    if (searchTodoDto.criteria) {
      let critera1 = { name: Like(`%${searchTodoDto.criteria}%`)};
      let criteria2 = { description: Like(`%${searchTodoDto.criteria}%`)}
      if(searchTodoDto.status){
        criteria2['status'] = searchTodoDto.status;
      }
      criterias.push(critera1);
      criterias.push(criteria2);

    }
    if (criterias.length) {
      return this.todoRepository.find({ withDeleted: true, where: criterias });
    }
    return this.todoRepository.find({ withDeleted: true});
  }


  async getAll(offset:number,take:number):Promise<TodoEntity[]>{
    return await this.todoRepository.find({
      take:take,
      skip:offset
    });
  }

  getStats(debut:Date, fin:Date) : any{
    const qb = this.todoRepository.createQueryBuilder("todo");
    
    if(debut.toString() === 'Invalid Date'){
      debut = new Date(0); // starting from 0
    }
    if(fin.toString() === 'Invalid Date'){
      fin = new Date(); // no limit
    }
    console.log(fin,debut);
    return qb.select('status , count(todo.id) as nombre').groupBy('status').where('todo.createdAt > :debut AND todo.createdAt < :fin',{
      debut,
      fin
    }).getRawMany();
  }


}
