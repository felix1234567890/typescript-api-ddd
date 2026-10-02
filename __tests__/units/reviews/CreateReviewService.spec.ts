import { FakeBookRepository } from '../../fakes/FakeBookRepository';
import { FakeReviewRepository } from '../../fakes/FakeReviewRepository';
import { CreateReviewService } from '../../../src/modules/reviews/services/CreateReviewService';

let fakeBookRepository: FakeBookRepository;
let fakeReviewRepository: FakeReviewRepository;
let createReview: CreateReviewService;

describe('Create Review Service', () => {
  beforeEach(() => {
    fakeBookRepository = new FakeBookRepository();
    fakeReviewRepository = new FakeReviewRepository();
    createReview = new CreateReviewService(fakeReviewRepository, fakeBookRepository);
  });

  it('should create a review for a book written by someone else', async () => {
    const book = await fakeBookRepository.create({ title: 'Dune', description: 'Desert planet', authorId: 1 });

    const review = await createReview.execute({ text: 'Great', bookId: book.id, userId: 2 });

    expect(review).toMatchObject({ bookId: book.id, text: 'Great' });
    await expect(fakeReviewRepository.findAll()).resolves.toHaveLength(1);
  });

  it('should not create a review for the reviewer’s own book', async () => {
    const book = await fakeBookRepository.create({ title: 'Dune', description: 'Desert planet', authorId: 1 });

    await expect(createReview.execute({ text: 'Great', bookId: book.id, userId: 1 })).rejects.toMatchObject({
      statusCode: 401,
      message: 'You can not create review for your own book',
    });
    await expect(fakeReviewRepository.findAll()).resolves.toHaveLength(0);
  });

  it('should not create a review for a book that does not exist', async () => {
    await expect(createReview.execute({ text: 'Great', bookId: 99, userId: 1 })).rejects.toMatchObject({
      message: 'Cannot create review for a book that does not exist',
    });
  });
});
