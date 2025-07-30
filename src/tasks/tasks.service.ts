import { Injectable, NotFoundException, Search } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { CreateTodoDto } from './dto/todo.dto';
import { User } from '../auth/user.entity';
import { GetTodosFilterDto } from './dto/filter-todo.dto';
import { PaginatedTodosDto } from './dto/paginated-todos.dto';
import { TodoStatus } from './todo-status.enum';
import { UpdateTodoStatusDto } from './dto/update-todo.dto';
import { create } from 'domain';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async getTodos(user: User, filterDto: GetTodosFilterDto): Promise<PaginatedTodosDto> {
      const {
    status,
    search,
    deadline,
    page = '1',
    limit = '10',
    sortBy = 'createdAt',
    sortOrder = 'DESC',
  } = filterDto;

  


    const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);
  const skip = (pageNumber - 1) * limitNumber;

  const query = this.todoRepository.createQueryBuilder('todo');
  query.where('todo.userId = :userId', { userId: user.id });

  // 👇 (Optional) You’ll apply filters here later
  // if (filterDto.status) { ... }
      if (status) {
        query.andWhere('todo.status = :status', { status });
    }

    if(deadline){

        const today = new Date();
        if (deadline === 'before') {
            query.andWhere('todo.deadline < :today', { today });
        } else if (deadline === 'after') {
            query.andWhere('todo.deadline > :today', { today });
        } else if (deadline === 'today') {
            query.andWhere('DATE(todo.deadline) = DATE(:today)', { today });
        }
    }
    
    
    query.orderBy(`todo.${sortBy}`, sortOrder.toUpperCase() as 'ASC' | 'DESC')

  const [todos, total] = await query
    .skip(skip)
    .take(limitNumber)
    .getManyAndCount();
    
    
    
    // Apply sorting


  return {
    todos: todos,
    total,
    page: pageNumber,
    limit: limitNumber,
    lastPage: Math.ceil(total / limitNumber),

  };
    // if (search){}
    // return this.todoRepository.find({
    //   where: { userId: user.id },
    // });
  }

  async createTodo(createTodoDto: CreateTodoDto, user: User): Promise<Todo> {
    const { title, description, status } = createTodoDto;

    const todo = this.todoRepository.create({
      title,
      description,
      status,  // Default to PENDING if not provided
      deadline: new Date(createTodoDto.deadline),
      user,
    });

    await this.todoRepository.save(todo);
    return todo;
  }

  async updateTodo(id: string, user: User, updates: Partial<Todo>): Promise<Todo> {
    const todo = await this.todoRepository.findOne({
      where: { id, userId: user.id },
    });

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    Object.assign(todo, updates);
    return this.todoRepository.save(todo);
  }

  async deleteTodo(id: string, user: User): Promise<void> {
    const result = await this.todoRepository.delete({ id, userId: user.id });

    if (result.affected === 0) {
      throw new NotFoundException('Todo not found');
    }
  }

  async updateTodoStatus(id: string, user: User, updateStatus: UpdateTodoStatusDto): Promise<Todo> {
    const todo = await this.todoRepository.findOne({
      where: { id, userId: user.id },
    });

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    todo.status = updateStatus.status;
    return this.todoRepository.save(todo);
  }
}
