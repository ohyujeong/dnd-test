import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type KeyWordDocument = KeyWord & Document;

@Schema()
export class KeyWord {
  @Prop()
  content: string;
}

export const KeyWordSchema = SchemaFactory.createForClass(KeyWord);
