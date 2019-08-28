let keys = {};
// keys can extended for testing and production.
if(process.argv.slice(2) == 'development'){
    keys['tokenTime'] = 7*24*3600*1000;
    //keys['apiUrl'] = "http://localhost:3000";
    keys['contentType'] = "application/json";
    keys['secret'] = "supersecret";
    keys['MONGODB_URI'] = "mongodb://localhost:27017/event";
}

exports.keys = keys;