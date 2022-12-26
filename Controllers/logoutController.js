const fsPromises = require("node:fs/promises")
const path = require("node:path")

const usersDB = {
	users: require("../Models/users.json"),
	setUsers: function (data) { this.users = data }
}
const logoutController = async function (req, res,) {
	// we also need to dlelte the cookie on the client "access token"
	const cookies = req.cookies
	if (!cookies?.jwt) return res.sendStatus(204) //no content

	const logoutToken = cookies.jwt
	const matchUser = usersDB.users.find(person => person.refreshToken == logoutToken)

	if (!matchUser) {
		req.clearCookie('jwt', { maxAge: 24 * 60 * 60 * 1000, httpOnly: true })
		return res.status(201)
	}
	// delete refreshToken
	const othersUser = usersDB.users.filter(prev => prev.refreshToken !== logoutToken)
	const currentuser = { ...matchUser, refreshToken: "" }

	usersDB.setUsers([...othersUser, currentuser])
	await fsPromises.writeFile(path.join(__dirname, "..", "Models", "users.json"),
		JSON.stringify(usersDB.users, null, 2),
		{ encoding: "utf-8" }
	)
	res.clearCookie('jwt', { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, secure: true })
	res.sendStatus(204)

}

module.exports = { logoutController }
