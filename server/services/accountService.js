const Account = require("../database/models/accountModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

module.exports.createAccount = async (accountData) => {
  try {
    const accounts = Array.isArray(accountData) ? accountData : [accountData];
    const results = await Account.insertMany(accounts);
    return results;
  } catch (error) {
    console.error("Error creating account(s):", error.message);
    throw error;
  }
};

module.exports.getAccount = async (req) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new Error("Token missing!");

    const { id: userId } = jwt.verify(token, process.env.JWT_SECRET);
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid user ID");
    }

    const account = await Account.findOne({ accountID: userId });
    if (!account) throw new Error("Account not found!");

    return account;
  } catch (error) {
    console.error("Error fetching account:", error.message);
    throw error;
  }
};
module.exports.getAllAccounts = async () => {
  try {
    return await Account.find({});
  } catch (error) {
    console.error("Error fetching all accounts:", error.message);
    throw error;
  }
};
module.exports.updateAccountNote = async (req) => {
  console.log("=====> id", req.body.transaction_id);
  console.log("=====> note", req.body.transactionNote);
  console.log("=====> category", req.body.transactionCategory);

  try {
    // Essayer de trouver quel compte contient la transaction
    const accountPaths = ["account1", "account2", "account3"];
    let updatedAccount = null;

    for (let path of accountPaths) {
      updatedAccount = await Account.findOneAndUpdate(
        { [`${path}.transactions._id`]: req.body.transaction_id },
        {
          $set: {
            [`${path}.transactions.$.transactionNote`]:
              req.body.transactionNote,
            [`${path}.transactions.$.transactionCategory`]:
              req.body.transactionCategory,
          },
        },
        { new: true }
      );

      if (updatedAccount) {
        break;
      }
    }

    if (!updatedAccount) {
      throw new Error("Compte ou transaction non trouvé !");
    }

    return updatedAccount;
  } catch (error) {
    throw new Error(
      error.message ||
        "Erreur lors de la mise à jour de la note de transaction."
    );
  }
};
