const path = require("node:path")
const fsPromises = require("node:fs/promises")

require("dotenv").config()
const bcript = require("bcrypt")
const jwt = require("jsonwebtoken")

const usersDB = {
	users: require("../Models/users.json"),
	setUsers: function (data) { this.users = data }
}

const authController = async function (req, res,) {
	const { name, password } = req.body
	if (!name || !password) return res.status(500).json({ "message": "server required name and password" })

	// ckeck for duplication
	const matchUser = usersDB.users.find(person => person.name == name)
	// 401 for unAuth
	if (!matchUser) return res.status(401).send("Unauthorized !")
	// TODO check hashPassword with bcript
	const matchpassword = await bcript.compare(password, matchUser.password)

	// TODO must hash password
	if (matchpassword) {
		// TODO JWTs

		const accesToken = jwt.sign(
			{ "name": name },
			process.env.ACCESS_TOKEN_KEY,
			{ expiresIn: "60s" }
		)

		const refreshToken = jwt.sign(
			{ "name": name },
			process.env.REFRESH_TOKEN_KEY,
			{ expiresIn: "1d" }
		)
		// save the refresh token on database  and send the access token to the client
		const otherstuser = usersDB.users.filter((user) => user.name !== matchUser.name)
		const currentuser = { ...matchUser, refreshToken }

		usersDB.setUsers([...otherstuser, currentuser])

		await fsPromises.writeFile(path.join(__dirname, "..", "Models", "users.json"),
			JSON.stringify(usersDB.users, null, 2),
			{ encoding: "utf-8" }
		)
		// this can be save as cookie on client
		res.cookie("jwt", refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, secure: true, sameSite: "None" })
		res.json({ "accesstoken": `${accesToken}` })

	} else {
		// 409 for conflict}
		res.sendStatus(401)
	}
}

module.exports = { authController }