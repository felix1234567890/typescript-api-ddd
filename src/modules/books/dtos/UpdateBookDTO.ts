import { CreateBookDTO } from './CreateBookDTO';

export interface UpdateBookDTO extends Partial<CreateBookDTO> {
  id: number;
}
