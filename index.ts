import type { Context } from 'grammy'
import type { Message } from '@grammyjs/types'

export function getMainText(
  message: Message.TextMessage | Message.CaptionableMessage
): string {
  return 'text' in message ? message.text : message.caption;
}

export function getQuoteText(message: Message.CommonMessage): string {
  return message?.quote?.text;
}

export function getReplyText(message: Message.CommonMessage): string {
  return message?.reply_to_message?.text;
}

export function getStringifiedCommandArgument(ctx: Context): string {
  return String(ctx.match);
}
