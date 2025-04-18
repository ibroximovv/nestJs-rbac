
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ActorDocument = HydratedDocument<Actor>;

@Schema()
export class Actor {
  @Prop()
  name: string;

  @Prop()
  image: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Film' })
  films: mongoose.Types.ObjectId;
}

export const ActorSchema = SchemaFactory.createForClass(Actor);
