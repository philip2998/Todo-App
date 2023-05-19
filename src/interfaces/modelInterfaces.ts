import { Document, Query } from 'mongoose';

export default interface IUserSchema extends Document {
  name: string;
  email: string;
  role: 'user' | 'admin';
  password: string;
  passwordConfirm?: string;
  active: boolean;
  find(active: object): Query<IUserSchema[], IUserSchema>;
  correctPassword(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean>;
}

export interface ITodoSchema extends Document {
  title: string;
  description: string;
}
