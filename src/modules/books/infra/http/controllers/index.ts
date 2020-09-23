import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateBookService } from '../../../services/CreateBookService';
import { GetBooksService } from '../../../services/GetBooksService';

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
    const book = await storeBook.execute({ title, description, authorId: id });
    return response.status(201).json(book);
  }
}
