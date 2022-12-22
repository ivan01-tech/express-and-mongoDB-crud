const { eventLog } = require("./eventLogs")

const errorLogger = function (err, req, res, _next) {
	console.error("Error : ", err.message)
	eventLog("errLog.txt", `${err.message}\t${req.url}\t${req.headers.origin}\t${req.method}`)
	res.status(500).send(err.message)
}

module.exports = errorLogger
