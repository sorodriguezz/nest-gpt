import OpenAI from 'openai';
import { downloadBase64ImageAsPng, downloadImagePng } from 'src/helpers';
import * as fs from 'fs';

interface Options {
  prompt: string;
  originalImage?: string;
  maskImage?: string;
}

export const imageGenerationUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { prompt, originalImage, maskImage } = options;

  if (!originalImage || maskImage) {
    const response = await openai.images.generate({
      prompt: prompt,
      model: 'dall-e-3',
      n: 1,
      size: '1024x1024',
      quality: 'standard',
      response_format: 'url',
    });

    const fileName = await downloadImagePng(response.data[0].url);
    const url = `${process.env.SERVER_URL}/gpt/image-generation/${fileName}`;

    return {
      url: url,
      openAiUrl: response.data[0].url,
      revisedPrompt: response.data[0].revised_prompt,
    };
  }

  //NOTE - Edición de imagenes
  const pngImagePath = await downloadImagePng(originalImage, true);
  const maskPath = await downloadBase64ImageAsPng(maskImage, true);

  const response = await openai.images.edit({
    model: 'dall-e-2',
    image: fs.createReadStream(pngImagePath),
    prompt: prompt,
    mask: fs.createReadStream(maskPath),
    n: 1,
    size: '1024x1024',
    response_format: 'url',
  });

  const fileName = await downloadImagePng(response.data[0].url);
  const url = `${process.env.SERVER_URL}/gpt/image-generation/${fileName}`;

  return {
    url: url,
    openAiUrl: response.data[0].url,
    revisedPrompt: response.data[0].revised_prompt,
  };
};
