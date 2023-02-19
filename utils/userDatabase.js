export class UserDatabase {

	constructor(mongoSchemaDatabase) {
		this.mongoSchema = mongoSchemaDatabase
	}

	findOneByprop = async (prop) => {
		await this.mongoSchema.findOne({ ...prop }).exec()
	}

	create = async (prop) => {
		await this.mongoSchema.create({
			...prop
		})
	}
}