"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        mongoose_1.default.set('strictQuery', false);
        yield mongoose_1.default.connect('mongodb://localhost:27017/expenses');
        console.log('DB Connected');
    }
    catch (error) {
        console.error('DB Connection Error:', error);
    }
});
exports.connectDB = connectDB;
// import mongoose,{model,Schema} from"mongoose";
// mongoose.connect("mongodb://localhost:27017/expenses")
// export interface UserType extends Document {
//   username: string;
//   password: string;
// }
// const UserSchema=new Schema({
//     username:{type:String,unique:true},
//     password:String
// })
// export const UserModel= model("User",UserSchema);
// const ExpenseSchema = new Schema({
//     title:String,
//     amount:Number,
//     category:String,
//     date:{type:Date,default:Date.now  },
//     userId:{type:mongoose.Types.ObjectId,ref:'User',
//         required: true
//     }
// })
// export const ContentModel=model("content",ExpenseSchema);
