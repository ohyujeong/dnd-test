import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
  });


export interface Product extends mongoose.Document{
    id: string; //TS는 타입 소문자로 시작
    title: string;
    description: string;
    price: number;
}