const Account = require("../database/models/accountModel");

module.exports.postAccount = async (req, res) => {
  console.log("Données reçues :", req.body);
  const { accounts } = req.body;

  if (
    !accounts ||
    !accounts.accountDetails ||
    !accounts.accountDetails.accountNumber
  ) {
    return res.status(400).json({ error: "Aucune donnée fournie" });
  }
  try {
    if (!req.body || !Array.isArray(req.body) || req.body.length === 0) {
      return res.status(400).json({ error: "Aucune donnée fournie" });
    }

    const serviceData = req.body;
    console.log("Données reçues :", serviceData);
  } catch (error) {
    console.error("Erreur dans accountService.js :", error.message);
    return res.status(500).json({ error: error.message });
  }
};

exports.getAccount = async (userId) => {
  console.log("Vérification de l'ID utilisateur :", userId);
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid user ID");
  }
  const account = await Account.findOne({ accountID: userId });
  if (!account) {
    throw new Error("Account not found!");
  }
  return account;
};
