require("dotenv").config()
const jwt = require('jsonwebtoken')

const verifyJWT = function (req, res, next) {

	const authHeader = req.headers.authorization || req.headers.Authorization
	console.log(req.headers)
	if (!authHeader?.startsWith("Bearer")) return res.status(401)

	const token = authHeader.split(" ")[1]
	console.log("token : ", token)

	jwt.verify(
		token,
		process.env.ACCESS_TOKEN_KEY,
		function (err, decoded) {
			// invalid token
			if (err) return res.sendStatus(403)

			res.user = decoded.UserInfo.name
			res.roles = decoded.UserInfo.roles
			next()
		})

}

module.exports = { verifyJWT } 
