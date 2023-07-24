import { Document, Query } from 'mongoose';

export interface IUserSchema extends Document {
  name: string;
  email: string;
  role: 'user' | 'admin';
  password: string;
  photo: string;
  passwordConfirm: string | undefined;
  passwordChangedAt: number;
  passwordResetToken: string | undefined;
  passwordResetExpires: number | undefined;
  active: boolean;
  find(active: object): Query<IUserSchema[], IUserSchema>;
  correctPassword(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean>;
  createPasswordResetToken(): string;
}

export interface ITodoSchema extends Document {
  title: string;
  description: string;
  userId: string;
  userName: string;
}
