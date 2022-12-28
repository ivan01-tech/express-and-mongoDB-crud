const mongoose = require("mongoose")

const schemaEmployees = new mongoose.Schema({
	firstname: { type: String, require: true, minLength: 4, maxLength: 20 },
	lastname: { type: String, require: true, minLength: 4, maxLength: 20 },
})

const modelEmployees = mongoose.model("Employees", schemaEmployees)

module.exports = modelEmployees