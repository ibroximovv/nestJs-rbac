
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type FilmDocument = HydratedDocument<Film>;

@Schema()
export class Film {
  @Prop()
  name: string;

  @Prop()
  image: string;

  @Prop()
  price: number
}

export const FilmSchema = SchemaFactory.createForClass(Film);
