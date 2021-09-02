import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { Task, TaskStatus } from './task.module';
import { v4 as uuid } from 'uuid';
import { TasksSearchDto } from '../dto/tasks-search.dto';

@Injectable()
export class TasksService {
    private tasks = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTask(id: string): Task {
        return this.tasks.find((el) => el.id === id);
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN,
        };
        this.tasks.push(task);
        return task;
    }

    deleteTask(id): void {
        this.tasks = this.tasks.filter((el) => el.id !== id);
    }

    searchTasks({ title, description }: TasksSearchDto): Task[] {
        return this.tasks.filter((el) => el.title.includes(title) || el.description.includes(description));
    }
}
