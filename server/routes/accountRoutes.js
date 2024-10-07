const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController");
const tokenValidation = require("../middleware/tokenValidation");
const Account = require("../database/models/accountModel");

router.post("/api/v1/accounts", accountController.createAccount);

router.post("/", (req, res) => {
  const { transactionNote } = req.body;
  if (!transactionNote) {
    return res.status(400).json({ message: "Note is required" });
  }
  const newTransaction = new Account({
    transactionNote,
  });
  newTransaction.save();
  res.status(201).json({ message: "Note added successfully" });
});

router.get("/", async (req, res) => {
  try {
    const accounts = await Account.find();
    res.status(200).json(accounts);
  } catch (error) {
    console.error("Erreur lors de la récupération des comptes:", error);
    res
      .status(500)
      .json({ message: "Erreur serveur lors de la récupération des comptes" });
  }
});

router.put(
  "/api/v1/transactions/update-note",
  accountController.updateAccountNote
);

module.exports = router;
