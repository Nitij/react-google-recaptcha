const express = require("express");
const cors = require("cors");
const { login } = require("./callableFunctions/login")

const app = express();
app.use(cors({ origin: true }));

exports.login = login;