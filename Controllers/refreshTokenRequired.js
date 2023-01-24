const jwt = require("jsonwebtoken")
const modelUsers = require("../Models/Users.js")


const refreshController = async function (req, res,) {
	const cookies = req.cookies
	if (!cookies?.jwt) return res.sendStatus(401) //forbidden
	console.log(cookies.jwt)

	const refreshToken = cookies.jwt
	const matchUser = await modelUsers.findOne({ refreshToken }).exec()

	if (!matchUser) return res.sendStatus(403)

	// evaluate JWT 
	jwt.verify(refreshToken,
		process.env.REFRESH_TOKEN_KEY,
		function (err, decoded) {
			if (err || decoded.name !== matchUser.name) return res.sendStatus(403)

			const roles = Object.values(matchUser.roles)

			const accessToken = jwt.sign({
				"UserInfo": {
					"name": decoded.name,
					"roles": roles
				}
			},
				process.env.ACCESS_TOKEN_KEY,
				{ expiresIn: "10s" }
			)
			res.json({ accessToken, roles })
		})

}

module.exports = { refreshController }