import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Book } from '../../../../books/infra/typeorm/entity';
import { IUser } from '../../../entities/IUser';

@Entity({ name: 'users' })
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Book, book => book.author, { onDelete: 'CASCADE' })
  books: Book[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  /** Never serialize the password hash, wherever the user ends up in a response. */
  toJSON(): Omit<User, 'password' | 'toJSON'> {
    const { password: _password, ...user } = this;
    return user;
  }
}
