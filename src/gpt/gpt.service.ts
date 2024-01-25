import { Injectable } from '@nestjs/common';
import { ortographyCheckUseCase } from './use-cases';

@Injectable()
export class GptService {
  ortographyCheck() {
    return ortographyCheckUseCase();
  }
}
