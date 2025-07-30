import {
  IsOptional,
  IsEnum,
  IsString,
  IsNumberString,
  IsIn,
} from 'class-validator';
import { TodoStatus } from '../todo-status.enum';

export class GetTodosFilterDto {
  @IsOptional()
  @IsEnum(TodoStatus)
  status?: TodoStatus;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsIn(['before', 'after', 'today'])
  deadline?: string;

  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;

  @IsOptional()
  @IsIn(['createdAt', 'updatedAt'])
  sortBy?: string;

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortOrder?: string;

  
}
