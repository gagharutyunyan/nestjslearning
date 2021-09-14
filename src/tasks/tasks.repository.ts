import { EntityRepository, Repository } from 'typeorm';
import { Task } from './tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UserEntity } from '../auth/user.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async getTasks(name: string, user: UserEntity) {
        const query = this.createQueryBuilder('task');

        query.where('task.userId = :userId', { userId: user.id });
        if (name) query.andWhere('task.name LIKE :name', { name: `%${name}%` });

        return await query.getMany();
    }

    async createTask(createTaskDto: CreateTaskDto, user: UserEntity): Promise<Task> {
        const task = new Task();
        Object.assign(task, createTaskDto);
        task.user = user.id;
        await task.save();
        return task;
    }
}
