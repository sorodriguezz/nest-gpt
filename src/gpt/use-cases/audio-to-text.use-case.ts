import OpenAI from 'openai';
import * as fs from 'fs';

interface Options {
  prompt?: string;
  audioFile: Express.Multer.File;
}

export const audioToTextUseCase = async (
  openai: OpenAI,
  { prompt, audioFile }: Options,
) => {
  const response = await openai.audio.transcriptions.create({
    file: fs.createReadStream(audioFile.path),
    model: 'whisper-1',
    prompt: prompt, // mismo idioma del audio - https://platform.openai.com/docs/guides/speech-to-text/prompting
    language: 'es',
    // response_format: 'vtt',
    response_format: 'verbose_json',
  });

  return response;
};
