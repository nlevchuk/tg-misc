import type { Context } from 'grammy'
import type { Message } from '@grammyjs/types'

import {
  getMainText,
  getQuoteText,
  getReplyText,
  getStringifiedCommandArgument,
} from '../index.js'

const baseMessage = {
  message_id: 1,
  date: 1761482385,
  chat: { id: 123, type: 'private', first_name: 'Tester' },
} as const;

describe('getMainText', () => {
  it('returns undefined when message is undefined', () => {
    expect(getMainText(undefined)).toBeUndefined();
  });

  it('returns undefined when neither the text nor caption properties are present', () => {
    expect(getMainText(baseMessage)).toBeUndefined();
  });

  it('returns text from regular messages', () => {
    const message = {
      ...baseMessage,
      text: 'How are you?',
    } as Message.TextMessage;

    expect(getMainText(message)).toBe('How are you?');
  });

  it('returns the caption associated with media messages', () => {
    const message = {
      ...baseMessage,
      caption: 'This is a photo of a fluffy cat',
      photo: [],
    } as Message.CaptionableMessage;

    expect(getMainText(message)).toBe('This is a photo of a fluffy cat');
  });
});

describe('getQuoteText', () => {
  it('returns undefined when message is undefined', () => {
    expect(getQuoteText(undefined)).toBeUndefined();
  });

  it('returns undefined if the quote property is not present', () => {
    expect(getQuoteText(baseMessage)).toBeUndefined();
  });

  it('returns quoted text', () => {
    const message = {
      ...baseMessage,
      quote: { text: 'quoted text' },
    } as Message.CommonMessage;

    expect(getQuoteText(message)).toBe('quoted text');
  });
});

describe('getReplyText', () => {
  it('returns undefined when message is undefined', () => {
    expect(getReplyText(undefined)).toBeUndefined();
  });

  it('returns undefined if the replied message is not present', () => {
    expect(getReplyText(baseMessage)).toBeUndefined();
  });

  it('returns replied text', () => {
    const repliedMessage = {
      ...baseMessage,
      message_id: 0,
      text: 'What is the name of your cat?',
    } as Message.CommonMessage;

    const message = {
      ...baseMessage,
      reply_to_message: repliedMessage,
    } as Message.CommonMessage;

    expect(getReplyText(message)).toBe('What is the name of your cat?');
  });
});

describe('getStringifiedCommandArgument', () => {
  it('returns argument if it is a string', () => {
    const context = {
      match: 'I am a stringified command argument',
    } as Context;

    expect(getStringifiedCommandArgument(context)).toBe('I am a stringified command argument');
  });

  it('returns undefined if the argument is an array', () => {
    const matchArray = Object.assign(['hello'], {
      index: 0,
      input: 'hello world, hello string',
      groups: undefined,
    }) as RegExpMatchArray;
    const context = {
      match: matchArray,
    } as Context;

    expect(getStringifiedCommandArgument(context)).toBeUndefined();
  });
});
