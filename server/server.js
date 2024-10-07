const express = require("express");
const dotEnv = require("dotenv");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const yaml = require("yamljs");
const swaggerDocs = yaml.load("./swagger.yaml");
const dbConnection = require("./database/connection");
const accountRoutes = require("./routes/accountRoutes");
const bodyParser = require("body-parser");

dotEnv.config();

const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 3001;

// Connect to the database
dbConnection();

// Handle CORS issues
app.use(cors());

// Request payload middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle custom routes
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/accounts", accountRoutes);
app.put("/api/v1/transactions/update-note", accountRoutes);

// API Documentation
if (process.env.NODE_ENV !== "production") {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}

app.get("/", (req, res) => {
  res.send("Hello from my Express server v2!");
});

// Listen to the server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

const morgan = require("morgan");
app.use(morgan("dev"));
