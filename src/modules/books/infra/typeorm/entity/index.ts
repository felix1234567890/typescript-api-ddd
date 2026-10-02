import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { Review } from '../../../../reviews/infra/typeorm/entity';
import { User } from '../../../../users/infra/typeorm/entity';
import { IBook } from '../../../entities/IBook';

@Entity('books')
export class Book implements IBook {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ name: 'author_id' })
  authorId: number;

  @ManyToOne(() => User, user => user.books)
  @JoinColumn({ name: 'author_id' })
  author: Relation<User>;

  @OneToMany(() => Review, review => review.book, { onDelete: 'CASCADE' })
  reviews: Review[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
