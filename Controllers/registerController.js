const fspromises = require("node:fs/promises")
const path = require('node:path')
const bcript = require("bcrypt")

const usersDB = {
	users: require("../Models/users.json"),
	setUsers: function (data) { this.users = data }
}

const registerController = async function (req, res,) {
	const { name, password } = req.body
	if (!name || !password) return res.status(500).json({ "message": "server required name and password" })

	// ckeck for duplication
	const dupliated = usersDB.users.find(person => person.name == name)
	if (dupliated) return res.status(409).json({ "message": "duplicated user on database" })// 409 for duplication

	// TODO must hash password
	const hashPassword = await bcript.hash(password, 10)

	console.log("hashPassword : ", hashPassword)

	const newUser = { "name": name, "password": hashPassword }
	console.log(newUser)
	try {
		const dbPath = path.join(__dirname, "..", "Models", "users.json")

		usersDB.setUsers([...usersDB.users, newUser])

		await fspromises.writeFile(
			dbPath,
			JSON.stringify(usersDB.users, null, 2)
		)

		res.status(201).json({ "message": `new user created ${name}` })

	} catch (err) {

		console.log(err)
		res.status(500).json({ "message": `"can't create new user: ${err.message}` })

	}
}
module.exports = { registerController }