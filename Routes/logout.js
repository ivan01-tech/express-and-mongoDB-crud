const express = require("express")
const { logoutController } = require("../Controllers/logoutController")

const logoutRouter = express.Router()

logoutRouter.get("/", logoutController)

module.exports = logoutRouter
