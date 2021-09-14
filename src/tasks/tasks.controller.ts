import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './tasks.entity';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/customDecorators/get-user.decorator';
import { UserEntity } from '../auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private taskService: TasksService) {}

    @Get()
    getTasks(@Query('name') name: string, @GetUser() user: UserEntity) {
        return this.taskService.getTasks(name, user);
    }

    @Get('/:id')
    getTask(@Param('id') id: number): Promise<Task> {
        return this.taskService.getTask(id);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto, @GetUser() user: UserEntity) {
        return this.taskService.createTask(createTaskDto, user);
    }

    @Delete('/:id')
    deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.taskService.deleteTask(id);
    }

    @Patch(':id')
    async updateTask(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateTask: UpdateTaskDto,
    ): Promise<Task> {
        return this.taskService.updateTask(id, updateTask);
    }
}
