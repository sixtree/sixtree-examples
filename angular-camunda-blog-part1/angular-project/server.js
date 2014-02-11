var request = require('request');
var express = require('express');
var app = express();

var forward = function(pattern, host){
    return function(req, res, next){
        if(req.url.match(pattern)){
            console.log(req.method + " " + req.url);
            var db_path = req.url.match(pattern)[1]
                ,db_url = [host, db_path].join('/');
            console.log("-> " + db_url);
			var methodName = req.method.toLowerCase();
            req.pipe(request[methodName](db_url)).pipe(res);
        }else{
            next();
        }
    }
}

app.configure(function(){
    app.use(express.methodOverride());
    app.use(forward(/\/engine-rest\/(.*)/, "http://localhost:8082/engine-rest"));    
    app.use(express.static(__dirname));
});

app.listen(8085);