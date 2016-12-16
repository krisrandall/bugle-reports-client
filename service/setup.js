 
 var Sql = require('./sql.js');
    var schemas = [
        /*{
            "newnrg_reports": 
            {
                id: "string primary key",
                name: "string",
                query: "string"
            }
        },*/
        {
            "newnrg_report_params": {
                id: "string primary key",
                name: "string",
                report_id: "string",
                data_type: "string"
            }
        }           
        
    ];

    schemas.forEach((schema)=>{
        Sql.Crate.create(schema).success(function(data) {
            console.log(JSON.stringify(data));
        })
        .error(function(err) {
            console.error(err);
        })      
    });
