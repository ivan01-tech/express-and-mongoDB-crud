const jwt = require("jsonwebtoken")
require("dotenv").config()

const usersDB = {
	users: require("../Models/users.json"),
	setUsers: function (data) { this.users = data }
}

const refreshController = function (req, res,) {
	const cookies = req.cookies
	if (!cookies?.jwt) return res.sendStatus(401) //forbidden

	console.log(cookies)
	console.log(cookies.jwt)

	const refreshToken = cookies.jwt
	const matchUser = usersDB.users.find(person => person.refreshToken == refreshToken)

	if (!matchUser) return res.status(403)

	// evaluate JWT 
	jwt.verify(refreshToken,
		process.env.REFRESH_TOKEN_KEY,
		function (err, decoded) {
			if (err || decoded.name !== matchUser.name) return res.sendStatus(403)
			const accesstoken = jwt.sign(
				{ "name": decoded.name },
				process.env.ACCESS_TOKEN_KEY,
				{ expiresIn: "60s" }
			)
			res.json({ accesstoken })
		})

}

module.exports = { refreshController }