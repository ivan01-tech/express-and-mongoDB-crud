require("dotenv").config()
const jwt = require('jsonwebtoken')

const verifyJWT = function (req, res, next) {

	const authHeader = req.headers["authorization"]
	if (!authHeader) return res.status(401)

	console.log("authHeader : ", authHeader)

	const token = authHeader.split(" ")[1]

	jwt.verify(token, process.env.ACCESS_TOKEN_KEY, function (err, decoded) {
		if (err) return res.sendStatus(403)
		// invalid token

		res.user = decoded.name
		next()
	})

}

module.exports = { verifyJWT } 
