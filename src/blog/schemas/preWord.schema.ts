import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export type PreWordDocument = PreWord & Document;

@Schema()
export class PreWord {
  @Prop({
      type:mongoose.Schema.Types.ObjectId,
      ref: 'KeyWord'
  })
  keywordId:mongoose.Types.ObjectId;

  @Prop()
  content:string;
}

export const PreWordSchema = SchemaFactory.createForClass(PreWord);
