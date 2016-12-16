var Async = require('async');

var Sql = require('./sql.js');
var Utils = require('./utils.js');
var Sdk = require('../sdk/newnrg-reporter-sdk.js');

var requiredFields = ['id', 'name', 'query', 'parameters'];

exports.post = function(req, res) {
	var dataType = req.params.dataType;
	var reportData = req.body;
	var result;
	
    Async.series(
        [
            function _saveRecord(callback) {
                Sql.insertSingle("newnrg_reports", reportData, requiredFields, (err, data) =>{
                    result = data; 
                    result.newnrg_report_params = [];
                    callback(err);
                });

            },
            
            function _saveParameters(callback) {
                if (reportData.parameters && reportData.parameters.length) {
                    var parameterRecords = reportData.parameters.map((p)=>{ p.report_id = result.id; return p })
                    Sql.insertMulti("newnrg_report_params", reportData.parameters, ['name', 'report_id', 'data_type'], (err, data) =>{
                        result.newnrg_report_params.push(data);
                        callback(err);
                    });
                }
                else callback(null);
            }
        ],
        function(err) {
           Utils.handleResponse(err, result, res, 500);
        }
    );



}


