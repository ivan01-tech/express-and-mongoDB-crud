const express = require("express")
const employeeRoute = express.Router()

const verifyRoles = require("../../middleware/verifyRoles")
const ROLES_LIST = require("../../config/rolesList")
const employeesController = require("../../Controllers/employeesController")

employeeRoute.route("/")
	.get(employeesController.getAllEmployees)
	.post(verifyRoles(ROLES_LIST.Editor, ROLES_LIST.Admin), employeesController.addEmployee)
	.put(verifyRoles(ROLES_LIST.Editor, ROLES_LIST.Admin), employeesController.setEmployee)
	.delete(verifyRoles(ROLES_LIST.Admin), employeesController.deleleEmployeeById)

employeeRoute.route("/:id")
	.get(employeesController.getEmployeeById)

module.exports = employeeRoute