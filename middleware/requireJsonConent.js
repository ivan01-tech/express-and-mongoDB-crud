/**
 * A middleware that helps to require JSON in the request
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

const requireJsonContent = function (req, res, next) {

	if (req.headers["content-type"] !== "application/json")
		res.status(400).send("Server require json content")
	else next()
}

module.module = requireJsonContent