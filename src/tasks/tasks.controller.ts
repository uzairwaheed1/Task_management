import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Query, Req, Patch } from '@nestjs/common';
import { TodosService } from './tasks.service';
import { CreateTodoDto } from './dto/todo.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { Todo } from './todo.entity';
import { GetTodosFilterDto } from './dto/filter-todo.dto';
import { PaginatedTodosDto } from './dto/paginated-todos.dto';
import { TodoStatus } from './todo-status.enum';
import { UpdateTodoStatusDto } from './dto/update-todo.dto';

@Controller('todos')
@UseGuards(JwtAuthGuard)
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get()
  getTodos(@GetUser() user: User,
  @Req() req,
 @Query() filterDto: GetTodosFilterDto,): Promise<PaginatedTodosDto> {
    return this.todosService.getTodos(user, filterDto);
  }

  @Post()
  createTodo(
    @Body() createTodoDto: CreateTodoDto,
    @GetUser() user: User,
  ): Promise<Todo> {
    return this.todosService.createTodo(createTodoDto, user);
  }

  @Put('/:id')
  updateTodo(
    @Param('id') id: string,
    @Body() updates: Partial<Todo>,
    @GetUser() user: User,
  ): Promise<Todo> {
    return this.todosService.updateTodo(id, user, updates);
  }

  @Delete('/:id')
  deleteTodo(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.todosService.deleteTodo(id, user);
  }

  @Patch('/:id/status')
    updateTodoStatus(
        @Param('id') id: string,
        @Body() updateTodoStatusDto: { status: UpdateTodoStatusDto },
        @GetUser() user: User,
    ): Promise<Todo> {
        return this.todosService.updateTodoStatus(id, user, updateTodoStatusDto.status);
    }
}
