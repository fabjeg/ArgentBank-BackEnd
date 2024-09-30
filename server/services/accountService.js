const Account = require("../database/models/accountModel");
const mongoose = require("mongoose");
module.exports.postAccount = async (req, res) => {
  try {
    if (!req.body || !Array.isArray(req.body) || req.body.length === 0) {
      return res.status(400).json({ error: "Aucune donnée fournie" });
    }

    const newAccounts = await Promise.all(
      req.body.map(async (serviceData) => {
        const accountExists = await Account.findOne({
          $or: [
            {
              "account1.accountDetails.accountNumber":
                serviceData.account1.accountDetails.accountNumber,
            },
            {
              "account2.accountDetails.accountNumber":
                serviceData.account2.accountDetails.accountNumber,
            },
            {
              "account3.accountDetails.accountNumber":
                serviceData.account3.accountDetails.accountNumber,
            },
          ],
        });

        if (accountExists) {
          throw new Error("Le compte existe déjà");
        }

        const newAccount = new Account(serviceData);
        return await newAccount.save();
      })
    );

    return res.status(201).json(newAccounts);
  } catch (error) {
    console.error("Erreur dans accountService.js :", error.message);
    return res.status(500).json({ error: error.message });
  }
};

exports.getAccount = async (req) => {
  console.log("Tentative de récupération des comptes...");
  const jwtToken = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.decode(jwtToken);
  const userId = decodedToken.id;

  console.log("ID utilisateur décodé :", userId);

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid user ID");
  }

  const account = await Account.findOne({ accountID: userId });

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
