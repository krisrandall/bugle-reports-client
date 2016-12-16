
var Async = require('async');
var Crate = require('node-crate');
var Utils = require('./utils');
var Sdk = require('../sdk/newnrg-reporter-sdk.js');


Crate.connect ('localhost', 4200);
exports.Crate = Crate;


function validateRecord(record, requiredFields) {

	if (!record.id) {
		//Create GUID
		record.id = Sdk.makeUid();
	}

	if (record.value) {
		record.textValue = record.value.toString();
	}
	if (!record.numberValue && !isNaN(record.textValue)) {
		record.numberValue = Number(record.textValue);
	}	
	if (!record.timestamp) {
		record.timestamp = new Date().getTime();
	}

	var missingFields = requiredFields.filter((f)=>{ return (typeof(record[f]) == "undefined") });

	//Remove disallowed extra fields
	//This can also be done by specifying the column policy as strict
	/*var finalRecord = {};
	requiredFields.concat(otherFields).forEach((f)=>{
		finalRecord[f] = record[f];		
	});*/
	var finalRecord = record;
	
	return {
		"valid": (missingFields.length === 0),
		"record": finalRecord,
		"missingFields": missingFields,
	}
}
exports.validateRecord = validateRecord;

exports.insertMulti = function(table, records, requiredFields, callback) {
    var result = [];
    Async.eachLimit(
        records,
        5,
        function(record) {
            var validation = validateRecord(record, requiredFields);
            Crate.insert(table, validation.record)
    			.success((data)=>{
    			    result.push(validation.record);
    				callback(null);
    			})
    			.error((err)=>{
    				callback(err, validation);
    			});
        },
        function(err) {
            callback(err, result); 
        }
        
        
    )
}

exports.insertSingle = function(table, record, requiredFields, callback) {
    var result;
    var validation = validateRecord(record, requiredFields);
    Crate.insert(table, validation.record)
		.success((data)=>{
		    result = validation;
			callback(null, validation.record);
		})
		.error((err)=>{
			callback(err, validation);
		});
}