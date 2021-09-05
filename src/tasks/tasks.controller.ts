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
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { Task } from './tasks.entity';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {}

    @Get()
    getTasks(@Query('name') name: string) {
        return this.taskService.getTasks(name);
    }

    @Get('/:id')
    getTask(@Param('id') id: number): Promise<Task> {
        return this.taskService.getTask(id);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto) {
        return this.taskService.createTask(createTaskDto);
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
