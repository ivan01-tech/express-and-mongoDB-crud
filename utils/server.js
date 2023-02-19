require("dotenv").config()
const path = require("node:path")
const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require('cors')

const employeeRoute = require('../Routes/api/employee.js')
const { logger } = require("../middleware/eventLogs.js")
const errorLogger = require("../middleware/errorLogs.js")
const subRoute = require("../Routes/subdir.js")
const rootRoute = require("../Routes/root.js")
const coreOptions = require('../config/cors.js')
const registerRoute = require("../Routes/register.js")
const authRoute = require("../Routes/auth.js")
const { verifyJWT } = require("../middleware/verifiyJWT.js")
const refreshRouter = require("../Routes/refresh.js")
const logoutRouter = require("../Routes/logout.js")
const connectDB = require("../config/dbConnection.js")
const usersRoute = require("../Routes/api/users.js")

function createServer() {

	const app = express()

	// coustom middleware
	app.use(logger)

	// Cross Origin Ressources Sharing
	app.use(cors(coreOptions))

	// a middleware which helps to get form data in the url went submitting the form
	app.use(express.urlencoded({ extended: false }))
	// to handle json data and parse request went the content type match
	app.use(express.json())

	// cookie parser middleware
	app.use(cookieParser())

	// by default express protect data like images and css files to the user , this built in middleware helps us to make them available to the user
	app.use(express.static(path.join(__dirname, 'public')))
	app.use("/sub", express.static(path.join(__dirname, 'public')))

	app.use("/", rootRoute)
	app.use("/register", registerRoute)
	app.use("/auth", authRoute)
	app.use("/refresh", refreshRouter)
	app.use("/logout", logoutRouter)

	// all routes after this will be protected
	app.use(verifyJWT)
	app.use("/employees", employeeRoute)
	app.use("/users", usersRoute)
	app.use("/sub", subRoute)

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
	// coustom logger to handle error
	app.use(errorLogger)

	return app

}

module.exports = createServer

