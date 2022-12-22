const { appendFile, existsSync } = require("node:fs")
const { mkdir } = require("node:fs/promises")
const { join } = require("node:path")
const { v4: uuid } = require("uuid")

const dir = join(__dirname, "..", "Logs")
/**
 * to save all requests histories in fileName inside the Logs directory at the root
 * @param {string} fileName 
 * @param {string} data 
 */
const eventLog = async function (fileName, data) {

	if (!existsSync(dir))
		await mkdir(dir)

	const msg = `${new Date().toLocaleString()}\t${uuid()}\t${data}\n`
	appendFile(join(dir, fileName), msg, { encoding: "utf-8" }, function (err) {
		if (err) {
			console.error("error ::  ", err)
			return
		}

		console.log("Files save")
	})
}
/**
 *  the logger middleware
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const logger = function (req, res, next) {

	// to save request history
	eventLog("logReq.txt", `${req.url}\t${req.headers.origin}\t${req.method}`)

	console.log(`${req.path}  ${req.method}`)

	next()
}

module.exports = { eventLog, logger }