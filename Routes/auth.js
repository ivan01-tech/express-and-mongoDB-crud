const express = require('express')

const { authController } = require('../Controllers/authController.js')

const authRoute = express.Router()

authRoute.post("/", authController)

module.exports = authRoute