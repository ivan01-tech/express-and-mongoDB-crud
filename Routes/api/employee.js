const express = require("express")
const employeeRoute = express.Router()
const {
	getAllEmployees,
	addEmployee,
	setEmployee,
	deleleEmployeeById,
	getEmployeeById
} = require("../../Controllers/employeesController")

employeeRoute.route("/")
	.get(getAllEmployees)
	.post(addEmployee)
	.put(setEmployee)
	.delete(deleleEmployeeById)

employeeRoute.route("/:id")
	.get(getEmployeeById)

module.exports = employeeRoute