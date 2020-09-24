import { IReview } from './IReview';

class FakeReview implements IReview {
  id: number;
  text: string;
  bookId: number;
  createdAt: Date;
  updatedAt: Date;
}
export default FakeReview;
