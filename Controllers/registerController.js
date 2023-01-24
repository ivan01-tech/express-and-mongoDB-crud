const bcript = require("bcrypt")
const { modelUsers } = require("../Models/Users.js")

const registerController = async function (req, res,) {
	const { name, password } = req.body

	if (!name || !password) return res.status(500).json({ "message": "server required name and password" })

	// ckeck for duplication
	const dupliated = await modelUsers.findOne({ name }).exec()

	console.log(dupliated)

	if (dupliated) return res.status(409).json({ "message": "duplicated user on database" })// 409 for duplication

	const hashPassword = await bcript.hash(password, 10)

	console.log("hashPassword : ", hashPassword)

	// we don't need to specify the user roles because it has a default value
	try {

		const result = await modelUsers.create({
			"name": name,
			"password": hashPassword,
		})
		console.log(result)

		res.status(201).json({ "message": `new user created ${name}` })

	} catch (err) {

		console.log(err)
		res.status(500).json({ "message": `"can't create new user: ${err.message}` })

	}
}
module.exports = { registerController }