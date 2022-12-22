const express = require("express")
const path = require("node:path")
const cors = require('cors')

const { logger } = require("./middleware/eventLogs.js")
const errorLogger = require("./middleware/errorLogs.js")

const app = express()
const port = process.env.PORT || 3500

// coustom middleware
app.use(logger)

// domains thats are allowed to access the server
const whiteList = ["http://localhost:3500", "https://www.google.com", "http://127.0.0.1:5500",]

const options = {
	optionsSuccessStatus: 200,
	origin: function (ori, callback) {
		if (whiteList.indexOf(ori) !== -1 || !ori)
			callback(null, true)
		else callback(new Error("Not allowed by CORS"))
	}
}

// Cross Origin Ressources Sharing
app.use(cors(options))

/**
	built in middleware 
 **/
// a middleware which helps to get form data in the url went submitting the form
app.use(express.urlencoded({ extended: false }))

// to handle json data and parse request went the content type match
app.use(express.json())

// by default express protect data like images and css files to the user , this built in middleware helps us to make them available to the user
app.use("/img", express.static(path.join(__dirname, 'public')))

app.get("^/$|index(.html)?", function (req, res) {
	res.sendFile(path.join(__dirname, "views", "index.html"))
})

app.get("/subdir", function (req, res, next) {
	res.sendFile(path.join(__dirname, "views", "subdir", "index.html"))
})

app.get("/new-page(.html)?", function (req, res) {
	res.sendFile(path.join(__dirname, "views", "new-page.html"))
})

app.get("/old-page(.html)?", function (req, res) {
	res.redirect(301, path.join(__dirname, "new-page.html"))
})

// app.use is use for middleware and app.all is commonly use for routing
app.all("*", function (req, res) {

	res.statusCode = 404

	if (req.accepts("html"))
		res.sendFile(path.join(__dirname, "views", "404.html"))
	else if (req.accepts("json"))
		res.json(`{ "message": "Not found !" }`)
	else
		res.send(`Not found !`)

})

// app.get("/*", function (req, res) {
// 	res.status(404).sendFile(path.join(__dirname, "views", "404.html"))
// })

app.use(errorLogger)

app.listen(port, function () {
	console.log('serve is running on port ' + port)
})
