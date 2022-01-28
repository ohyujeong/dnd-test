import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

const options: SchemaOptions = {
  timestamps: true,
  id: true,
}

@Schema(options)
export class Blog extends mongoose.Document{

  @Prop()
  blogId: Number;

  @Prop()
  title: String;

  @Prop()
  description: String;

  @Prop()
  body: String;

  @Prop()
  author: String;

  /* timestamps */
  createAt: Date;
  updateAt: Date;
};

export const BlogSchema = SchemaFactory.createForClass(Blog);