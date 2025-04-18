
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Roles } from '../enum/roles.enum';

export type UserAuthDocument = HydratedDocument<UserAuth>;

@Schema()
export class UserAuth {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  role: Roles
}

export const UserAuthSchema = SchemaFactory.createForClass(UserAuth);
