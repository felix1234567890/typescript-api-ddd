import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { BookGetDeleteDTO } from '../../../dtos/BookGetDeleteDTO';
import { CreateBookService } from '../../../services/CreateBookService';
import { DeleteBookService } from '../../../services/DeleteBookService';
import { GetBookService } from '../../../services/GetBookService';
import { GetBooksService } from '../../../services/GetBooksService';
import { UpdateBookService } from '../../../services/UpdateBookService';

export class BookController {
  public async index(request: Request, response: Response): Promise<Response> {
    const getBooks = container.resolve(GetBooksService);
    const books = await getBooks.execute();
    return response.status(200).json(books);
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { title, description } = request.body;
    const { id } = request.user;
    const storeBook = container.resolve(CreateBookService);
    const book = await storeBook.execute({ title, description, authorId: parseInt(id) });
    return response.status(201).json(book);
  }

  public async book(request: Request, response: Response): Promise<Response> {
    const { id } = request.params as BookGetDeleteDTO;
    const getBook = container.resolve(GetBookService);
    const book = await getBook.execute(id!);
    return response.status(200).json(book);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params as BookGetDeleteDTO;
    const { id: userId } = request.user;
    const deleteBook = container.resolve(DeleteBookService);
    await deleteBook.execute(id!, userId);
    return response.status(204).json();
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { title, description } = request.body;
    const id = parseInt(request.params.id);
    const authorId = parseInt(request.user.id);
    const updateBook = container.resolve(UpdateBookService);
    const book = await updateBook.execute({ id, title, description, authorId });
    return response.status(200).json(book);
  }
}
