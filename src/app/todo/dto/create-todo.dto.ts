import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsNotEmpty } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @ApiProperty()
  task: string;

  @IsNotEmpty()
  @ApiProperty()
  IsDone: string;
}
