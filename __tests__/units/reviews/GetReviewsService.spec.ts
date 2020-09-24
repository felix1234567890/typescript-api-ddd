import { FakeReviewRepository } from '../../../src/modules/reviews/repositories/FakeRevewRepository';
import { GetReviewsService } from '../../../src/modules/reviews/services/GetReviewsService';

let fakeReviewRepository: FakeReviewRepository;
let getReviews: GetReviewsService;

describe('Get Reviews Service', () => {
  beforeEach(() => {
    fakeReviewRepository = new FakeReviewRepository();
    getReviews = new GetReviewsService(fakeReviewRepository);
  });
  it('should be able to get all reviews', async () => {
    await fakeReviewRepository.create({
      bookId: 1,
      text: 'BLA BLA BLA BLA LABA 1',
    });
    await fakeReviewRepository.create({
      bookId: 2,
      text: 'BLA BLA BLA BLA LABA 2',
    });
    await expect(getReviews.execute()).resolves.toHaveLength(2);
  });
});
