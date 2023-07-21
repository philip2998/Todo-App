import mongoose, { Model, Schema } from 'mongoose';
import { IUserSchema } from '../interfaces/modelInterfaces.js';

import validator from 'validator';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

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
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
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

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre<IUserSchema>(/^find/, function (next): void {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.pre<IUserSchema>('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.createPasswordResetToken = function (): string {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User: Model<IUserSchema> = mongoose.model<IUserSchema>(
  'User',
  userSchema
);

export default User;
