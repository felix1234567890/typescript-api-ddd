import { container } from 'tsyringe';
import { BcryptHashProvider } from './BCryptHashProvider';

container.register('HashProvider', { useValue: new BcryptHashProvider() });
