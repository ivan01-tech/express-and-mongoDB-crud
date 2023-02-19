const createServer = require("./utils/server")
const mongoose = require("mongoose")
const connectDB = require("./config/dbConnection")

const port = process.env.PORT || 3500

const app = createServer()
let serverClose
connectDB()

function serverCloseFoo() {
	const aa = app.listen(port, function () {
		console.log('server is running on port ' + port)
	})
	return () => aa
}

mongoose.connection.once("error", function (err) {
	console.log("mongo err  : ", err);
})
mongoose.connection.once("open", function () {
	// make sure that we are connected to the database first
	console.log("Connected to mongoDB...")
})
serverClose = serverCloseFoo()

module.exports = { app, serverClose }
