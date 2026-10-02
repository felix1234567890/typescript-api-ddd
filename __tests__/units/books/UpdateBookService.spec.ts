import { FakeBookRepository } from '../../fakes/FakeBookRepository';
import { UpdateBookService } from '../../../src/modules/books/services/UpdateBookService';

let fakeBookRepository: FakeBookRepository;
let updateBook: UpdateBookService;

describe('Update Book Service', () => {
  beforeEach(() => {
    fakeBookRepository = new FakeBookRepository();
    updateBook = new UpdateBookService(fakeBookRepository);
  });

  it('should let the author change the title', async () => {
    const book = await fakeBookRepository.create({ title: 'Dune', description: 'Desert planet', authorId: 1 });

    const updated = await updateBook.execute({ id: book.id, title: 'Dune Messiah', authorId: 1 });

    expect(updated).toMatchObject({ title: 'Dune Messiah', description: 'Desert planet' });
  });

  it('should not let someone else update the book', async () => {
    const book = await fakeBookRepository.create({ title: 'Dune', description: 'Desert planet', authorId: 1 });

    await expect(updateBook.execute({ id: book.id, title: 'Mine now', authorId: 2 })).rejects.toMatchObject({
      message: 'Cannot update others book',
    });
  });

  it('should fail for a missing book', async () => {
    await expect(updateBook.execute({ id: 7, title: 'x', authorId: 1 })).rejects.toMatchObject({
      message: 'Book not found',
    });
  });
});
