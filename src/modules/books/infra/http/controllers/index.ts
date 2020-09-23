import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { GetBooksService } from '../../../services/GetBooksService';

export class BookController {
  public async index(request: Request, response: Response): Promise<Response> {
    const getBooks = container.resolve(GetBooksService);
    const books = await getBooks.execute();
    return response.status(200).json(books);
  }
}
