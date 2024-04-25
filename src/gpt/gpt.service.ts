import { Injectable } from '@nestjs/common';
import {
  ortographyCheckUseCase,
  prosConsDiscusserStreamUseCase,
  prosConsDiscusserUseCase,
  textToAudioUseCase,
  translateUseCase,
} from './use-cases';
import {
  OrtographyDto,
  ProsConsDiscusserDto,
  TextToAudioDto,
  TranslateDto,
} from './dtos';
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

  async prosConsDiscusser({ prompt }: ProsConsDiscusserDto) {
    return await prosConsDiscusserUseCase(this.openai, { prompt });
  }

  async prosConsDiscusserStream({ prompt }: ProsConsDiscusserDto) {
    return await prosConsDiscusserStreamUseCase(this.openai, { prompt });
  }

  async translate({ prompt, lang }: TranslateDto) {
    return await translateUseCase(this.openai, { prompt, lang });
  }

  async textToAudio({ prompt, voice }: TextToAudioDto) {
    return await textToAudioUseCase(this.openai, { prompt, voice });
  }
}
