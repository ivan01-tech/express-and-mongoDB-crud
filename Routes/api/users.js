const express = require("express")
const usersRoute = express.Router()

// const verifyRoles = require("../../middleware/verifyRoles")
// const ROLES_LIST = require("../../config/rolesList")
const usersController = require("../../Controllers/usersController.js")

usersRoute.route("/")
	.get(usersController.getAllUsers)
// .post(verifyRoles(ROLES_LIST.Editor, ROLES_LIST.Admin), userssController.addusers)
// .put(verifyRoles(ROLES_LIST.Editor, ROLES_LIST.Admin), userssController.setusers)
// .delete(verifyRoles(ROLES_LIST.Admin), userssController.deleleusersById)

// usersRoute.route("/:id")
// 	.get(userssController.getusersById)

module.exports = usersRoute