const path = require("node:path")
const express = require("express")
const cors = require('cors')
const employeeRoute = require('./Routes/api/employee.js')

const { logger } = require("./middleware/eventLogs.js")
const errorLogger = require("./middleware/errorLogs.js")
const subRoute = require("./Routes/subdir.js")
const rootRoute = require("./Routes/root.js")
const coreOptions = require('./config/cors.js')

const app = express()
const port = process.env.PORT || 3500

// coustom middleware
app.use(logger)

// Cross Origin Ressources Sharing
app.use(cors(coreOptions))


// a middleware which helps to get form data in the url went submitting the form
app.use(express.urlencoded({ extended: false }))
// to handle json data and parse request went the content type match
app.use(express.json())

// by default express protect data like images and css files to the user , this built in middleware helps us to make them available to the user
app.use(express.static(path.join(__dirname, 'public')))
app.use("/sub", express.static(path.join(__dirname, 'public')))
// app.set("appName",'The Blog App')
// app.get('appName')
app.use("/", rootRoute)
app.use("/sub", subRoute)
app.use("/employees", employeeRoute)

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

app.listen(port, function () {
	console.log('server is running on port ' + port)
})
