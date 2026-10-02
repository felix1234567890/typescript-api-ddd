import { FakeReviewRepository } from '../../fakes/FakeReviewRepository';
import { GetReviewService } from '../../../src/modules/reviews/services/GetReviewService';

let fakeReviewRepository: FakeReviewRepository;
let getReview: GetReviewService;

describe('Get Review Service', () => {
  beforeEach(() => {
    fakeReviewRepository = new FakeReviewRepository();
    getReview = new GetReviewService(fakeReviewRepository);
  });

  it('should be able to get review by id', async () => {
    const { id } = await fakeReviewRepository.create({ bookId: 1, text: 'BLA BLA BLA BLA LABA 1' });
    await expect(getReview.execute(id)).resolves.toHaveProperty('bookId', 1);
  });

  it('should fail when the review does not exist', async () => {
    await expect(getReview.execute(404)).rejects.toMatchObject({ message: 'Review not found' });
  });
});
