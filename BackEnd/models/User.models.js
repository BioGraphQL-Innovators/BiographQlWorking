import mongoose, { Schema, model } from 'mongoose';

const RoleType = Object.freeze({
  PATIENT: 'PATIENT',
  NURSE: 'NURSE',
});

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: Object.values(RoleType),
  },
});

userSchema.statics.RoleType = RoleType;

const User = model('User', userSchema);

export default User;
