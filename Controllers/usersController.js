const modelUsers = require("../Models/Users")

const getAllUsers = async function (req, res, next) {
	console.log(".....................UDBDBODUUO.................")
	const result = await modelUsers.find()
	console.log("result : ", result);
	if (!result) return res.send(201).json({ "message": "No Users found ! " })

	res.json(result)

}

/* const addUsers = async function (req, res, next) {
	if (!req?.body?.firstname || !req?.body?.lastname) {
		res.sendStatus(500).json({ "message": "firstname and lastname required by the server !" })
	}

	const Users = await modelUsers.create({
		firstname: req.body.firstname,
		lastname: req.body.lastname
	})

	res.json(Users)
}

const setUsers = async function (req, res, next) {
	if (!req?.body?.id) {
		res.sendStatus(500).json({ "message": "id is required" })
	}
	const Users = await modelUsers.findOne({ _id: req.body.id }).exec()

	if (!Users) return res.status(201).json({ "message": `node user found with this ${id} ` })

	if (req?.body?.firstname) Users.firstname = req.body.firstname
	if (req?.body?.lastname) Users.lastname = req.body.lastname

	const result = await Users.save()
	console.log(result)

	res.json(result)
}

const deleleUsersById = async function (req, res, next) {

	if (!req?.body?.id) {
		res.sendStatus(500).json({ "message": "id is required" })
	}

	const Users = await modelUsers.deleteOne({ _id: req.body.id })

	if (!Users) return res.status(201).json({ "message": `no user found with this ${id} ` })

	res.json(Users)
}

const getUsersById = async function (req, res, next) {

	if (!req?.params?.id)
		res.sendStatus(500).json({ "message": "id is required" })

	const Users = await modelUsers.findOne({ _id: req.params.id })
	console.log(Users)
	res.json(Users)
} */

module.exports = {
	//  deleleUsersById, setUsers, addUsers, 
	getAllUsers
	// , getUsersById 
}