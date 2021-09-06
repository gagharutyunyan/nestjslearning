import { EntityRepository, Repository } from 'typeorm';
import { Task } from './tasks.entity';
import { CreateTaskDto } from '../dto/create-task.dto';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async getTasks(name: string) {
        const query = this.createQueryBuilder('task');

        if (name) query.andWhere('task.name LIKE :name', { name: `%${name}%` });

        return await query.getMany();
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const task = new Task();
        Object.assign(task, createTaskDto);
        await task.save();
        return task;
    }
}
