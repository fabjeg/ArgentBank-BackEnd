const express = require("express");
const router = express.Router();
const accountController = require("../services/accountService");

router.post("/api/v1/accounts", accountController.postAccount);
router.get("/", async (req, res) => {
  try {
    const accounts = await accountController.getAllAccounts(req);
    return res.status(200).json({
      accounts,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
