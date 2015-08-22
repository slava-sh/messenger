import { Schema, arrayOf, proxy } from 'app/utils/normalizer';

const pagesOf = schema => proxy('data', arrayOf(schema));

export const conversation = new Schema('conversations');
export const conversations = pagesOf(conversation);
export const message = new Schema('messages');
export const messages = pagesOf(message);
