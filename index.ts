import type { Context } from 'grammy'
import type { Message } from '@grammyjs/types'

// message.text contains text from regular messages sent to the bot
// message.caption contains the caption associated with animation, audio, document, photo, video or voice messages
export function getMainText(
  message: Message.TextMessage | Message.CaptionableMessage | undefined
): string | undefined {
  if (message === undefined) return undefined;
  return 'text' in message ? message.text : message.caption;
}

export function getQuoteText(
  message: Message.CommonMessage | undefined
): string | undefined {
  return message?.quote?.text;
}

export function getReplyText(
  message: Message.CommonMessage | undefined
): string | undefined {
  return message?.reply_to_message?.text;
}

export function getStringifiedCommandArgument({ match }: Context): string | undefined {
  return (typeof match === 'string') ? match : undefined;
}
