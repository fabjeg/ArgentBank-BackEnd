const mongoose = require("mongoose");

const accountDetailsSchema = new mongoose.Schema({
  accountNumber: { type: String, required: true },
  accountBalance: { type: Number, required: true },
});

const transactionSchema = new mongoose.Schema({
  date: { type: String, required: true },
  description: { type: String, required: true },
  transactionAmount: { type: Number, required: true },
  balanceAfterTransaction: { type: Number, required: true },
  transactionType: { type: String, required: true },
  transactionCategory: { type: String, required: true },
  transactionNote: { type: String, required: true },
});

const accountSchema = new mongoose.Schema(
  {
    accountID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    account1: {
      accountDetails: accountDetailsSchema,
      transactions: [transactionSchema],
    },
    account2: {
      accountDetails: accountDetailsSchema,
      transactions: [transactionSchema],
    },
    account3: {
      accountDetails: accountDetailsSchema,
      transactions: [transactionSchema],
    },
  },
  {
    timestamps: true,
    toObject: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model("Account", accountSchema);
