import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { Task } from './tasks.entity';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { TaskRepository } from './tasks.repository';

@Injectable()
export class TasksService {
    constructor(private readonly taskRepository: TaskRepository) {}

    async getTasks(name: string) {
        return await this.taskRepository.getTasks(name);
    }

    async getTask(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`not found ${id}`);
        }

        return found;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto);
    }

    async updateTask(id: number, updateTask: UpdateTaskDto): Promise<Task> {
        const task = await this.getTask(id);
        Object.assign(task, updateTask);
        await task.save();
        return task;
    }

    async deleteTask(id): Promise<void> {
        const res = await this.taskRepository.delete(id);
        if (res.affected === 0) throw new NotFoundException('Не найдено');
    }
}
