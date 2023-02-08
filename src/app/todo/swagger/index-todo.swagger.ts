import { TodoEntity } from '../enity/todo.entity';
import { OmitType } from '@nestjs/swagger';

export class IndexTodoSwagger extends OmitType(TodoEntity, [
  'createdAt',
  'deleteAt',
  'updateAt',
]) {}
