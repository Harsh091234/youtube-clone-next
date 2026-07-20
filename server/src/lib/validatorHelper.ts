import profanity from "./profanity.js";

const containsProfanity = (text: string) => {
  return profanity.exists(text);
};

 const hasRepeatedSpecialCharacters = (text: string) => {
  return /([!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])\1{4,}/.test(text);
};

 const hasRepeatedLetters = (text: string) => {
  return /(.)\1{5,}/i.test(text);
};

const hasRepeatedWords = (text: string) => {
  return /\b(\w+)(\s+\1){3,}\b/i.test(text);
};

const hasTooManyCaps = (text: string) => {
  const letters = text.replace(/[^a-z]/gi, "");

  if (letters.length < 10) return false;

  const capitals = letters.replace(/[^A-Z]/g, "");

  return capitals.length / letters.length > 0.8;
};

const hasTooManyEmojis = (text: string) => {
  const emojis = text.match(/[\u{1F300}-\u{1FAFF}]/gu) || [];

  return emojis.length > 10;
};

const hasLinks = (text: string) => {
  return /(https?:\/\/|www\.)/i.test(text);
};

export const validateComment = (text: string) => {
  if (!text.trim()) {
    return "Comment cannot be empty.";
  }

  if (containsProfanity(text)) {
    return "Your comment contains inappropriate language.";
  }

  if (hasRepeatedSpecialCharacters(text)) {
    return "Please avoid excessive special characters.";
  }

  if (hasRepeatedLetters(text)) {
    return "Please avoid repeating letters.";
  }

  if (hasRepeatedWords(text)) {
    return "Please avoid repeating the same word.";
  }

  if (hasTooManyCaps(text)) {
    return "Please avoid using all capital letters.";
  }

  if (hasTooManyEmojis(text)) {
    return "Too many emojis.";
  }

  if (hasLinks(text)) {
    return "Links are not allowed.";
  }

  return null;
};