const express = require("express")
const { refreshController } = require("../Controllers/refreshTokenRequired")
const refreshRouter = express.Router()

refreshRouter.get("/", refreshController)

module.exports = refreshRouter
