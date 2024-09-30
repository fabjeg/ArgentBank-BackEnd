const Account = require("../database/models/accountModel");

module.exports.postAccount = async (req, res) => {
  console.log("Données reçues :", req.body);
  const accounts = req.body[0];
  const { account1, account2, account3 } = accounts;
  if (
    !account1 ||
    !account1.accountDetails ||
    !account1.accountDetails.accountNumber ||
    !account2 ||
    !account2.accountDetails ||
    !account2.accountDetails.accountNumber ||
    !account3 ||
    !account3.accountDetails ||
    !account3.accountDetails.accountNumber
  ) {
    return res
      .status(400)
      .json({ error: "Aucune donnée fournie ou données invalides" });
  }
  try {
    const newAccount = new Account({
      account1,
      account2,
      account3,
    });
    await newAccount.save();
    return res
      .status(201)
      .json({ message: "Account created successfully", account: newAccount });
  } catch (error) {
    console.error("Erreur dans accountService.js :", error.message);
    return res.status(500).json({ error: error.message });
  }
};

exports.getAccount = async (userId) => {
  console.log("Vérification de l'ID utilisateur :", userId); // Ajoutez ce log
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid user ID");
  }
  const account = await Account.findOne({ accountID: userId });
  if (!account) {
    throw new Error("Account not found!");
  }
  return account;
};
