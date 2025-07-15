"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// 2. Define the schema
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
// 3. Compare directly
userSchema.methods.comparePassword = function (candidatePassword) {
    return this.password === candidatePassword;
};
// 4. Export
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
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
