import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TasksSearchDto } from '../dto/tasks-search.dto';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {}

    @Get()
    searchTasks(@Query() tasksSearchDto: TasksSearchDto) {
        if (Object.keys(tasksSearchDto).length) {
            return this.taskService.searchTasks(tasksSearchDto);
        } else {
            return this.taskService.getAllTasks();
        }
    }

    @Get('/:id')
    getTask(@Param('id') id: string) {
        return this.taskService.getTask(id);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto) {
        return this.taskService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): void {
        this.taskService.deleteTask(id);
    }
}
