const Account = require("../database/models/accountModel");
const accountService = require("../services/accountService");
const transactions = require("../database/models/accountModel");

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

module.exports.createAccount = async (req, res) => {
  let response = {};

  try {
    const responseFromService = await accountService.createAccount(req.body);
    response.status = 200;
    response.message = "Account successfully created";
    response.body = responseFromService;
  } catch (error) {
    console.error("Something went wrong in accountController.js", error);
    response.status = 400;
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};

module.exports.updateAccountNote = async (req, res) => {
  let response = {};

  try {
    const updatedAccount = await accountService.updateAccountNote(req);
    response.status = 200;
    response.message = "Note de transaction mise à jour avec succès !";
    response.body = updatedAccount;
  } catch (error) {
    console.log("Erreur dans updateAccountNote - accountController.js:", error);
    response.status = 400;
    response.message =
      error.message ||
      "Erreur lors de la mise à jour de la note de transaction.";
  }

  return res.status(response.status).json(response);
};
