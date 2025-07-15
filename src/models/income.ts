import mongoose, { Document, Schema, Model, Types } from 'mongoose';

// 1. Define the interface for the document
export interface IIncome extends Document {
  title: string;
  amount: number;
  type?: string;
  date: Date;
  category: string;
  description: string;
  userId: Types.ObjectId;        // 👈 added userId
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Define the schema
const IncomeSchema: Schema<IIncome> = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    amount: {
      type: Number,
      required: true,
      trim: true,
      max: 9999999,
    },
    type: {
      type: String,
      default: 'income',
    },
    date: {
      type: Date,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxLength: 20,
    },
    userId: {                        // 👈 add to schema
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

// 3. Export the model
const Income: Model<IIncome> = mongoose.model<IIncome>('Income', IncomeSchema);
export default Income;





// import mongoose, { Document, Schema, Model } from 'mongoose';

// // 1. Define the interface for the document
// export interface IIncome extends Document {
//   title: string;
//   amount: number;
//   type?: string;
//   date: Date;
//   category: string;
//   description: string;
//   createdAt?: Date;
//   updatedAt?: Date;
// }

// // 2. Define the schema
// const IncomeSchema: Schema<IIncome> = new Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//       trim: true,
//       maxLength: 50,
//     },
//     amount: {
//       type: Number,
//       required: true,
//       trim: true,
//       max: 9999999, // Replace maxLength with max for numeric validation
//     },
//     type: {
//       type: String,
//       default: 'income',
//     },
//     date: {
//       type: Date,
//       required: true,
//       trim: true,
//     },
//     category: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     description: {
//       type: String,
//       required: true,
//       trim: true,
//       maxLength: 20,
//     },
//   },
//   { timestamps: true }
// );

// // 3. Export the model
// const Income: Model<IIncome> = mongoose.model<IIncome>('Income', IncomeSchema);
// export default Income;
