const { modelUsers } = require("../Models/Users.js")

const logoutController = async function (req, res,) {
	// we also need to dlelte the cookie on the client "access token"
	// if there is no cookie , so there is no content to delelte
	const cookies = req.cookies
	if (!cookies?.jwt) return res.sendStatus(204) //no content

	const logoutToken = cookies.jwt
	const matchUser = await modelUsers.findOne({ refreshToken: logoutToken }).exec()

	if (!matchUser) {
		req.clearCookie('jwt', { maxAge: 24 * 60 * 60 * 1000, httpOnly: true })
		return res.sendStatus(201)
	}
	// delete refreshToken
	matchUser.refreshToken = ""
	const result = await matchUser.save()
	console.log("result : ", result)

	res.clearCookie('jwt', { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, secure: true })
	res.sendStatus(204)

}

module.exports = { logoutController }
