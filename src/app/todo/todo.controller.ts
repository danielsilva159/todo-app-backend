import { Controller } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Get, Post, Delete, Body, Param, Put, HttpCode } from '@nestjs/common';
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import { HttpStatus } from '@nestjs/common/enums';
import { CreateTodoDto } from './dto/create-todo.dto';

@Controller('api/v1/todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async index() {
    return await this.todoService.findAll();
  }

  @Post()
  async create(@Body() body: CreateTodoDto) {
    return await this.todoService.create(body);
  }

  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.todoService.findOneOrFail(id);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: CreateTodoDto,
  ) {
    return await this.todoService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.todoService.deleteById(id);
  }
}
