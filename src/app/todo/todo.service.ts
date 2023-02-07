import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from './enity/todo.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common/exceptions';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRePository: Repository<TodoEntity>,
  ) {}

  async findAll() {
    return await this.todoRePository.find();
  }

  async findOneOrFail(id: string) {
    try {
      return await this.todoRePository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async create(data: CreateTodoDto) {
    return await this.todoRePository.save(this.todoRePository.create(data));
  }

  async update(id: string, data: UpdateTodoDto) {
    const todo = await this.findOneOrFail(id);
    return await this.todoRePository.save(data);
  }

  async deleteById(id: string) {
    await this.findOneOrFail(id);
    await this.todoRePository.softDelete(id);
  }
}
