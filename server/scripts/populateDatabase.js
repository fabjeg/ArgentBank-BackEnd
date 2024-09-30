const axios = require("axios");
const signupApi = "http://localhost:3001/api/v1/user/signup";

const users = [
  {
    firstName: "Tony",
    lastName: "Stark",
    email: "tony@stark.com",
    password: "password123",
    userName: "Iron",
  },
  {
    firstName: "Steve",
    lastName: "Rogers",
    email: "steve@rogers.com",
    password: "password456",
    userName: "Captain",
  },
];

// users.forEach((user) => {
//   axios
//     .post(signupApi, user)
//     .then((response) => console.log(response))
//     .catch((error) => console.log(error));
// });
const accountAPI = "http://localhost:3001/api/v1/accounts";
const accounts = [
  {
    account1: {
      accountDetails: {
        accountNumber: "x0001",
        accountBalance: 100000,
      },
      transactions: [
        {
          date: "10/09/24",
          description: "Golden Sun Bakery",
          transactionAmount: 100,
          balanceAfterTransaction: 99900,
          transactionType: "Electronic",
          transactionCategory: "Food",
          transactionNote: "Lorem ipsum",
        },
        {
          date: "10/09/24",
          description: "Golden Sun Bakery",
          transactionAmount: 100,
          balanceAfterTransaction: 99800,
          transactionType: "Electronic",
          transactionCategory: "Food",
          transactionNote: "Lorem ipsum",
        },
        {
          date: "10/09/24",
          description: "Golden Sun Bakery",
          transactionAmount: 100,
          balanceAfterTransaction: 99700,
          transactionType: "Electronic",
          transactionCategory: "Food",
          transactionNote: "Lorem ipsum",
        },
        {
          date: "10/09/24",
          description: "Golden Sun Bakery",
          transactionAmount: 100,
          balanceAfterTransaction: 99600,
          transactionType: "Electronic",
          transactionCategory: "Food",
          transactionNote: "Lorem ipsum",
        },
        {
          date: "10/09/24",
          description: "Golden Sun Bakery",
          transactionAmount: 100,
          balanceAfterTransaction: 99500,
          transactionType: "Electronic",
          transactionCategory: "Food",
          transactionNote: "Lorem ipsum",
        },
      ],
    },
    account2: {
      accountDetails: {
        accountNumber: "x0002",
        accountBalance: 200000,
      },
      transactions: [
        {
          date: "10/09/24",
          description: "Wagamama FastFood",
          transactionAmount: 100,
          balanceAfterTransaction: 199900,
          transactionType: "Electronic",
          transactionCategory: "Food",
          transactionNote: "Lorem ipsum",
        },
        {
          date: "10/09/24",
          description: "Wagamama FastFood",
          transactionAmount: 100,
          balanceAfterTransaction: 199800,
          transactionType: "Electronic",
          transactionCategory: "Food",
          transactionNote: "Lorem ipsum",
        },
        {
          date: "10/09/24",
          description: "Wagamama FastFood",
          transactionAmount: 100,
          balanceAfterTransaction: 199700,
          transactionType: "Electronic",
          transactionCategory: "Food",
          transactionNote: "Lorem ipsum",
        },
        {
          date: "10/09/24",
          description: "Wagamama FastFood",
          transactionAmount: 100,
          balanceAfterTransaction: 199600,
          transactionType: "Electronic",
          transactionCategory: "Food",
          transactionNote: "Lorem ipsum",
        },
        {
          date: "10/09/24",
          description: "Wagamama FastFood",
          transactionAmount: 100,
          balanceAfterTransaction: 199500,
          transactionType: "Electronic",
          transactionCategory: "Food",
          transactionNote: "Lorem ipsum",
        },
      ],
    },
    account3: {
      accountDetails: {
        accountNumber: "x0003",
        accountBalance: 300000,
      },
      transactions: [
        {
          date: "10/09/24",
          description: "EDF Electricity Supplier",
          transactionAmount: 100,
          balanceAfterTransaction: 299900,
          transactionType: "Electronic",
          transactionCategory: "Service",
          transactionNote: "Lorem ipsum",
        },
        {
          date: "10/09/24",
          description: "EDF Electricity Supplier",
          transactionAmount: 100,
          balanceAfterTransaction: 299800,
          transactionType: "Electronic",
          transactionCategory: "Service",
          transactionNote: "Lorem ipsum",
        },
        {
          date: "10/09/24",
          description: "EDF Electricity Supplier",
          transactionAmount: 100,
          balanceAfterTransaction: 299700,
          transactionType: "Electronic",
          transactionCategory: "Service",
          transactionNote: "Lorem ipsum",
        },
        {
          date: "10/09/24",
          description: "EDF Electricity Supplier",
          transactionAmount: 100,
          balanceAfterTransaction: 299600,
          transactionType: "Electronic",
          transactionCategory: "Service",
          transactionNote: "Lorem ipsum",
        },
        {
          date: "10/09/24",
          description: "EDF Electricity Supplier",
          transactionAmount: 100,
          balanceAfterTransaction: 299500,
          transactionType: "Electronic",
          transactionCategory: "Service",
          transactionNote: "Lorem ipsum",
        },
      ],
    },
  },
];

axios
  .post(accountAPI, accounts, {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  })
  .then((response) => {
    console.log("Réponse:", response.data);
  })
  .catch((error) => {
    console.error("Erreur:", error);
  });
