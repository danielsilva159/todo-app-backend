import { Controller } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Get, Post, Delete, Body, Param, Put, HttpCode } from '@nestjs/common';
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import { HttpStatus } from '@nestjs/common/enums';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ApiOperation } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import { IndexTodoSwagger } from './swagger/index-todo.swagger';

@Controller('api/v1/todo')
@ApiTags('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as tarefas' })
  @ApiResponse({
    status: 200,
    type: IndexTodoSwagger,
    isArray: true,
  })
  async index() {
    return await this.todoService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Adicionar uma nova tarefa' })
  async create(@Body() body: CreateTodoDto) {
    return await this.todoService.create(body);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Exibir os dados de uma tarefa' })
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.todoService.findOneOrFail(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar os dados de uma tarefa' })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateTodoDto,
  ) {
    return await this.todoService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover uma tarefa' })
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.todoService.deleteById(id);
  }
}
