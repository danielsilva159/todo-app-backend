import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity({ name: 'todos' })
export class TodoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  task: string;
  @Column({ name: 'is_done', type: 'tinyint', width: 1 })
  isDone: number;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;
  @UpdateDateColumn({ name: 'updated_at' })
  updateAt: string;
  @DeleteDateColumn({ name: 'deleted_at' })
  deleteAt: string;
}
