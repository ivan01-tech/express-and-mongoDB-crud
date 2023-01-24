const modelEmployees = require("../Models/Employees.js")

const getAllEmployees = async function (req, res, next) {
	console.log(".....................UDBDBODUUO.................")
	const result = await modelEmployees.find()
	console.log("result : ", result);
	if (!result) return res.send(201).json({ "message": "No employees found ! " })

	res.json(result)

}

const addEmployee = async function (req, res, next) {
	if (!req?.body?.firstname || !req?.body?.lastname) {
		res.sendStatus(500).json({ "message": "firstname and lastname required by the server !" })
	}

	const employee = await modelEmployees.create({
		firstname: req.body.firstname,
		lastname: req.body.lastname
	})

	res.json(employee)
}

const setEmployee = async function (req, res, next) {
	if (!req?.body?.id) {
		res.sendStatus(500).json({ "message": "id is required" })
	}
	const employee = await modelEmployees.findOne({ _id: req.body.id }).exec()

	if (!employee) return res.status(201).json({ "message": `node user found with this ${id} ` })

	if (req?.body?.firstname) employee.firstname = req.body.firstname
	if (req?.body?.lastname) employee.lastname = req.body.lastname

	const result = await employee.save()
	console.log(result)

	res.json(result)
}

const deleleEmployeeById = async function (req, res, next) {

	if (!req?.body?.id) {
		res.sendStatus(500).json({ "message": "id is required" })
	}

	const employee = await modelEmployees.deleteOne({ _id: req.body.id })

	if (!employee) return res.status(201).json({ "message": `no user found with this ${id} ` })

	res.json(employee)
}

const getEmployeeById = async function (req, res, next) {

	if (!req?.params?.id)
		res.sendStatus(500).json({ "message": "id is required" })

	const employee = await modelEmployees.findOne({ _id: req.params.id })
	console.log(employee)
	res.json(employee)
}

module.exports = { deleleEmployeeById, setEmployee, addEmployee, getAllEmployees, getEmployeeById }