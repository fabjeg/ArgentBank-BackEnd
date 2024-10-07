const Account = require("../database/models/accountModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

exports.getAccount = async (req) => {
  const jwtToken = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.decode(jwtToken);
  const userId = decodedToken.id;

  console.log("ID utilisateur décodé :", userId);

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid user ID");
  }
  const account = await Account.findOne({ accountID: userId });
  console.log("Envoi des données du compte :", account);
  if (!account) {
    throw new Error("Account not found!");
  }
  return account;
};
exports.getAllAccounts = async () => {
  try {
    const accounts = await Account.find({});
    return accounts;
  } catch (error) {
    throw error;
  }
};
module.exports.createAccount = async (accountData) => {
  try {
    const accounts = Array.isArray(accountData) ? accountData : [accountData];

    const results = await Promise.all(
      accounts.map(async (data) => {
        const newAccount = new Account(data);
        return await newAccount.save();
      })
    );

    return results;
  } catch (error) {
    console.error("Error in accountService.js", error);
    throw new Error(error);
  }
};

module.exports.updateAccountNote = async (req) => {
  try {
    console.log("transaction_id:", req.body.transaction_id);
    console.log("transactionNote:", req.body.transactionNote);

    const updatedAccount = await Account.findOneAndUpdate(
      {
        "account1.transactions._id": req.body.transaction_id,
      },
      {
        $set: {
          "account1.transactions.$.transactionNote": req.body.transactionNote,
        },
      },
      { new: true }
    );

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
