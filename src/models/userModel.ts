import mongoose, { Document, Model, Query, Schema } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import IUserSchema from '../interfaces/modelInterfaces.js';

const userSchema: Schema<IUserSchema> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please tell us your name'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        // This only work on CREATE and SAVE!!!
        validator: function (this: IUserSchema, el: string): boolean {
          return el === this.password;
        },
        message: 'Passwords are not the same!',
      },
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Managing password Middleware
userSchema.pre<IUserSchema>('save', async function (next): Promise<void> {
  // Only run if password was actually modified
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre<IUserSchema>(/^find/, function (next): void {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User: Model<IUserSchema> = mongoose.model<IUserSchema>(
  'User',
  userSchema
);

export default User;
