import {translate} from "google-translate-api-x";

export const translateText = async (text: string, targetLanguage: string) => {
  const result = await translate(text, {
    to: targetLanguage,
  });

  return result.text;
};
