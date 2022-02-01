import { Document } from 'mongoose';

export interface Post extends Document {
  blogId: Number;
  readonly title: string;
  readonly description: string;
  readonly body: string;
  readonly author: string;
  readonly date_posted: string;
}