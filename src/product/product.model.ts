import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';
import * as mongoose from 'mongoose';
const autoIncrement = require('mongoose-auto-increment');

const options: SchemaOptions = {
  timestamps: true,
  id: true,
}

@Schema(options)
export class Product extends mongoose.Document{
  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  title: string;
  
  @Prop()
  description: string;

  @Prop()
  price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

// export const ProductSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     price: { type: Number, required: true },
//   });


// export interface Product extends mongoose.Document{
//     id: string;
//     title: string;
//     description: string;
//     price: number;
// }