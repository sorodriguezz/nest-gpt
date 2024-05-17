import { QuestionDto } from './dtos/question.dto';
import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import {
  checkCompleteStatusUseCase,
  createMessageUseCase,
  createRunUseCase,
  createThreadUseCase,
  getMessageListUseCase,
} from './use-cases';

@Injectable()
export class SamAssistantService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_APIKEY,
  });

  async createThread() {
    return await createThreadUseCase(this.openai);
  }

  async userQuestion(questionDto: QuestionDto) {
    const { question, threadId } = questionDto;
    await createMessageUseCase(this.openai, {
      question,
      threadId,
    });

    const run = await createRunUseCase(this.openai, { threadId });

    await checkCompleteStatusUseCase(this.openai, {
      runId: run.id,
      threadId: threadId,
    });

    const messages = await getMessageListUseCase(this.openai, { threadId });

    return messages;
  }
}
