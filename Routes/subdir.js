const express = require("express")
const path = require("node:path")
const subRoute = express.Router()

subRoute.get('^/$|index(.html)?', function (req, res, next) {
	res.sendFile(path.join(__dirname, "..", "views", "subdir", "index.html"))
})

subRoute.get('^/$|test(.html)?', function (req, res, next) {
	res.sendFile(path.join(__dirname, "..", "views", "subdir", "test.html"))
})

module.exports = subRoute