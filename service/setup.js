 
 var Sql = require('./sql.js');
    var schemas = [
        {
            "bugl_reports": 
            {
                id: "string primary key",
                name: "string",
                query: "string"
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
