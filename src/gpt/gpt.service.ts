import { Injectable } from '@nestjs/common';
import { ortographyCheckUseCase } from './use-cases';
import { OrtographyDto } from './dtos';
import OpenAI from 'openai';

@Injectable()
export class GptService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  ortographyCheck(ortographyDto: OrtographyDto) {
    return ortographyCheckUseCase(this.openai, {
      prompt: ortographyDto.prompt,
    });
  }
}
