import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IUserMeta extends Document {
  userId: mongoose.Types.ObjectId;
  plainPassword: string;
  loginTimes: Date[];
  loginCount: number;
  ipAddresses: string[];
}

const userMetaSchema: Schema<IUserMeta> = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  plainPassword: { type: String, required: true }, // ⚠ dangerous
  loginTimes: { type: [Date], default: [] },
  loginCount: { type: Number, default: 0 },
  ipAddresses: { type: [String], default: [] }
});

const UserMeta: Model<IUserMeta> = mongoose.model<IUserMeta>('UserMeta', userMetaSchema);
export default UserMeta;
