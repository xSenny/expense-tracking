import { Schema, model, models } from "mongoose";

const TransactionSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  amount: {type: Number, required: true},
  category: {type: String, required: true},
  createdAt: {type: Date, required: true},
  description: {type: String},
})

const Transaction = models.Transaction || model('Transaction', TransactionSchema)

export default Transaction