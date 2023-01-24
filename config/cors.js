// TODO  the list should be  update 
// domains thats are allowed to access the server

const allowedOrigins = ["http://localhost:3000", "https://www.site.com", "http://localhost:3500"]

const coreOptions = {
	origin: function (ori, callback) {
		console.log("ori : ", (ori))
		if (allowedOrigins.indexOf(ori) !== -1 || !ori) {
			callback(null, true)
		}
		else callback(new Error("Not allowed by CORS"))
	},
	optionsSuccessStatus: 200,
	credentials: true,
}

module.exports = coreOptions