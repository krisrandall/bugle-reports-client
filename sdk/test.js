var Sdk = require('./newnrg-reporter-sdk.js');

var client = new Sdk.Client({host:'45.79.83.93', port: 8081});
client.createDataType('questionnaire', function(err, data) {
    if (err) {
        console.error(err);
    }
    else {
        console.log(JSON.stringify(data));
    }
});

client.addRecord('questionnaire', 
    {
        "program_id": "ltwl",
        "custodian": "partner1",
        "contributor": "baz", 
        "item_id": "favourite_things",
        "action": "start",
        "overall_start": 0
    },
    function(err, data) {
        if (err) {
            console.error(err);
        }
        else {
            console.log(JSON.stringify(data));
        }       
    }
)