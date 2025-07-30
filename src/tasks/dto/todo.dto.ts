import { IsNotEmpty, IsString, IsOptional, IsDateString, IsIn } from 'class-validator';
import { TodoStatus } from '../todo-status.enum';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  @IsOptional()
  status?: TodoStatus; // Assuming taskStatus is a string, adjust as necessary

@IsNotEmpty()
@IsDateString()
deadline: string;

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  createdSort?: 'ASC' | 'DESC';

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  updatedSort?: 'ASC' | 'DESC';

  
}