import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect('mongodb://localhost:27017/expenses');
    console.log('DB Connected');
  } catch (error) {
    console.error('DB Connection Error:', error);
  }
};












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