import mongoose, { Document, Schema, Model } from 'mongoose';

// ✅ Add userId in interface
export interface IExpense extends Document {
  title: string;
  amount: number;
  type?: string;
  date: Date;
  category: string;
  description: string;
  userId: mongoose.Types.ObjectId;   // <-- add this
  createdAt?: Date;
  updatedAt?: Date;
}

const ExpenseSchema: Schema<IExpense> = new Schema(
  {
    title: { type: String, required: true, trim: true, maxLength: 50 },
    amount: { type: Number, required: true, trim: true, maxLength: 20 },
    type: { type: String, default: 'expense' },
    date: { type: Date, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true, maxLength: 20 },
    // ✅ add userId field in schema
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const Expense: Model<IExpense> = mongoose.model<IExpense>('Expense', ExpenseSchema);
export default Expense;
