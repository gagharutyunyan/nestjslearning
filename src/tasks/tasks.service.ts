import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './tasks.entity';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from './tasks.repository';
import { UserEntity } from '../auth/user.entity';

@Injectable()
export class TasksService {
    constructor(private readonly taskRepository: TaskRepository) {}

    async getTasks(name: string, user: UserEntity) {
        return await this.taskRepository.getTasks(name, user);
    }

    async getTask(id: number, user: UserEntity): Promise<Task> {
        const found = await this.taskRepository.findOne({ where: { id, user: user.id } });
        if (!found) {
            throw new NotFoundException(`not found ${id}`);
        }

        return found;
    }

    async createTask(createTaskDto: CreateTaskDto, user: UserEntity): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto, user);
    }

    async updateTask(id: number, updateTask: UpdateTaskDto, user: UserEntity): Promise<Task> {
        const task = await this.getTask(id, user);
        Object.assign(task, updateTask);
        await task.save();
        return task;
    }

    async deleteTask(id: number, user: UserEntity): Promise<void> {
        const res = await this.taskRepository.delete({ id, user: user.id });
        if (res.affected === 0) throw new NotFoundException('Не найдено');
    }
}
