var allowCrossDomain = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,PATCH,FILE');
	res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
	//res.header('Access-Control-Allow-Headers', '*');//'Content-Type,userId,token');

	next();
};
exports.allowCrossDomain = allowCrossDomain;

var logRequest = function(req, res, next) {
	console.log(req.ip, req.originalUrl);
	next();
};
exports.logRequest = logRequest;

function handleResponse(err, data, res, errCode)
{
	if (err)
	{
		if (!errCode)
		{
			errCode = 500;
		}
		res.status(errCode).json({"error": err, "data": data || null});
	}
	else
	{
		if (data)
		{
			if (data.toJSON)
			{
				data = data.toJSON();
			}
			res.status(200).json(data);
		}
		else
		{
			res.status(404).json({"error": "Item not found"});
		}
	}
}
exports.handleResponse = handleResponse;