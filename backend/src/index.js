const express = require("express");
const cors = require("cors");
const connectToMongo = require("./db");

require("dotenv").config();

const app = express();
const port = process.env.PORT;

const path = require("path");

connectToMongo();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/auth", require("./routes/auth"));
app.use("/yoga", require("./routes/yoga"));

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
