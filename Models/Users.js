const mongoose = require("mongoose")
const ROLES_LIST = require("../config/rolesList")

const schemaUsers = new mongoose.Schema({
	name: { type: String, require: true },
	password: { type: String, require: true, },
	refreshToken: String,
	roles: {
		Admin: Number,
		Editor: Number,
		User: { type: Number, default: ROLES_LIST.User },
	}
})
schemaUsers

const modelUsers = mongoose.model("Users", schemaUsers)

module.exports = { modelUsers, schemaUsers }