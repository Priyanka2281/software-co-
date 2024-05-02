import mongoose from 'mongoose';
import bcrypt from 'bcrypt'

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  isDeleted:{
    type:Boolean,
    default:false
  }
}, {
  timestamps: true
});

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @return {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } }).lean();
  return !!user;
};

// /**
//  * Check if password matches the user's password
//  * @param {string} password
//  * @returns {Promise<boolean>}
//  */
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line no-invalid-this
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const userModel = mongoose.model('users', userSchema);

export default userModel 
