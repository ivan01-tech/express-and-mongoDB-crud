const data = require("../Models/employees.json")

const getAllEmployees = function (req, res, next) {
	res.json(data)
}

const addEmployee = function (req, res, next) {
	res.json({
		"firstname": req.body.firstname,
		"lastname": req.body.lastname
	})
}

const setEmployee = function (req, res, next) {
	res.json({
		"firstname": req.body.firstname,
		"lastname": req.body.lastname
	})
}

const deleleEmployeeById = function (req, res, next) {
	res.json({ "id": req.body.id })
}

const getEmployeeById = function (req, res, next) {
	res.json({ "id": parseInt(req.params.id) })
}

module.exports = { deleleEmployeeById, setEmployee, addEmployee, getAllEmployees, getEmployeeById }