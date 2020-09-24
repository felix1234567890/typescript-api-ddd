import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Book } from '../../../../books/infra/typeorm/entity';
import { IReview } from '../../../entities/IReview';

@Entity({ name: 'reviews' })
export class Review implements IReview {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  text: string;

  @Column({ name: 'book_id' })
  bookId: number;

  @ManyToOne(() => Book, book => book.reviews)
  @JoinColumn({ name: 'book_id' })
  book?: Book;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
