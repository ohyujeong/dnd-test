import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import * as moment from 'moment-timezone';


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

  @Prop({
    type:Date,
    default: moment().format("YYYY-MM-DD 00:00:00")
  })
  createAt:Date;
}

export const PreWordSchema = SchemaFactory.createForClass(PreWord);
