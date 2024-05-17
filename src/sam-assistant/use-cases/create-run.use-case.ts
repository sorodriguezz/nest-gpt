import OpenAI from 'openai';

interface Options {
  threadId: string;
  assistentId?: string;
}

export const createRunUseCase = async (openai: OpenAI, options: Options) => {
  const { threadId, assistentId = process.env.ASSISTANT_ID } = options;

  const run = await openai.beta.threads.runs.create(threadId, {
    assistant_id: assistentId,
    model: 'gpt-4-turbo-preview',
    // instructions: // sobre escribe el asistente
  });

  console.log({ run });
  return run;
};
