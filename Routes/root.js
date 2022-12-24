const path = require("node:path")
const express = require("express")

const rootRoute = express.Router()

rootRoute.get("^/$|index(.html)?", function (req, res) {
	res.sendFile(path.join(__dirname, "..", "views", "index.html"))
})

rootRoute.get("/new-page(.html)?", function (req, res) {
	res.sendFile(path.join(__dirname, "..", "views", "new-page.html"))
})

rootRoute.get("/old-page(.html)?", function (req, res) {
	res.redirect(301, path.join(__dirname, "new-page.html"))
})

module.exports = rootRoute