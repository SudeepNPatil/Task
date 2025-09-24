import mongoose from 'mongoose';

const userschema = mongoose.Schema(
  {
    Name: {
      type: String,
      default: 'Gest',
    },
    Email: {
      type: String,
    },
    Number: {
      type: Number,
    },
    password: {
      type: String,
    },
  },
  { strict: false }
);

const User = mongoose.model('Signup', userschema);

export default User;
