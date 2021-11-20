import {
    BaseEntity,
    Column,
    Entity,
    Index,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../auth/user.entity';

@Entity()
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('')
    color: string;

    @Column({ default: false, nullable: false })
    isChecked: boolean;

    @ManyToOne(() => UserEntity, (user) => user.tasks, { eager: false })
    user: UserEntity;
}
