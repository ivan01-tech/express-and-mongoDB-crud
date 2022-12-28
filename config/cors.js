// TODO  the list should be  update 
// domains thats are allowed to access the server

const allowedOrigins = ["http://localhost:3500", "https://www.google.com", "http://127.0.0.1:5500",]

const coreOptions = {
	optionsSuccessStatus: 200,
	origin: function (ori, callback) {
		if (allowedOrigins.indexOf(ori) !== -1 || !ori)
			callback(null, true)
		else callback(new Error("Not allowed by CORS"))
	}
}

module.exports = coreOptions