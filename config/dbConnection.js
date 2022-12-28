const mongoose = require("mongoose")

const connectDB = async function () {
	mongoose.set('strictQuery', false);
	try {
		await mongoose.connect(process.env.DATABASE_URL, { useNewUrlparser: true, useUnifiedTopology: true })
	}
	catch (err) {
		console.log(err)
	}
}

module.exports = connectDB
