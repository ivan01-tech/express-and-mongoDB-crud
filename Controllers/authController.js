
require("dotenv").config()
const bcript = require("bcrypt")
const jwt = require("jsonwebtoken")
const { modelUsers, schemaUsers } = require("../Models/Users.js")

const authController = async function (req, res,) {
	const { name, password } = req.body
	if (!name || !password) return res.status(500).json({ "message": "server required name and password" })

	// ckeck for duplication
	// const matchUser = usersDB.users.find(person => person.name == name)
	const matchUser = await modelUsers.findOne({ name }).exec()
	// 401 for unAuth
	if (!matchUser) return res.status(401).send("Unauthorized !")

	const matchpassword = await bcript.compare(password, matchUser.password)

	if (matchpassword) {
		// verify JWT
		const roles = Object.values(matchUser.roles)
		console.log("roles : ", roles)
		// we just send the roles values not his signification
		const accesToken = jwt.sign(
			{
				"UserInfo": {
					"name": matchUser.name,
					"roles": roles
				}
			},
			process.env.ACCESS_TOKEN_KEY,
			{ expiresIn: "90s" }
		)

		const refreshToken = jwt.sign(
			{ "name": matchUser.name, },
			process.env.REFRESH_TOKEN_KEY,
			{ expiresIn: "1d" }
		)
		// save the refresh token on database  and send the access token to the client

		matchUser.refreshToken = refreshToken
		const result = await matchUser.save()
		console.log(result)
		// this can be save as cookie on client
		res.cookie("jwt", refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
		res.json({ "accesstoken": `${accesToken}` })

	} else {
		// 409 for conflict}
		res.sendStatus(401)
	}
}

module.exports = { authController }