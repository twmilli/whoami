var express = require("express");
var getIP = require('ipware')().get_ip;
var useragent = require('useragent');

var app = express();

app.set('port', (process.env.PORT) || 8080);


app.all('*', function(req, res){
    var ip = getIP(req).clientIp;
    var language = req.headers["accept-language"].split(',')[0];
    var agent = useragent.parse(req.headers['user-agent']);
    var os = agent.os.toString();
    var obj = {
        "ipaddress": ip,
        "language": language,
        "software": os, 
    }
    res.json(obj);
});

app.listen(app.get('port'), function(){
    console.log("listening on port " + app.get('port'));
});