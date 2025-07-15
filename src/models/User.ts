import mongoose, { Document, Model, Schema } from 'mongoose';

// 1. Define the User interface
export interface IUser extends Document {
  username: string;
  password: string;
  comparePassword(candidatePassword: string): boolean;
}

// 2. Define the schema
const userSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// 3. Compare directly
userSchema.methods.comparePassword = function (
  this: IUser,
  candidatePassword: string
): boolean {
  return this.password === candidatePassword;
};

// 4. Export
const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export default User;






// import mongoose, { Document, Model, Schema } from 'mongoose';

// // 1. Define the User interface
// export interface IUser extends Document {
//   username: string;
//   password: string;
//   comparePassword(candidatePassword: string): boolean;
// }

// // 2. Define the schema
// const userSchema: Schema<IUser> = new Schema({
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true }
// });

// // 3. Remove hashing: no pre-save hook

// // 4. Add method to compare passwords directly
// userSchema.methods.comparePassword = function (
//   this: IUser,
//   candidatePassword: string
// ): boolean {
//   return this.password === candidatePassword;
// };

// // 5. Create and export the model
// const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
// export default User;
