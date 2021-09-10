const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const CONFIG = require('../config')
const uri = CONFIG.DB_CONFIG.connectionUrl;
let isConnected;
const uriFormat = require('mongodb-uri');
function encodeMongoURI (urlString) {
    if (urlString) {
        let parsed = uriFormat.parse(urlString)
        urlString = uriFormat.format(parsed);
    }
    return urlString;
}

module.exports = connectToDatabase = () => {
    if (isConnected) {
        return Promise.resolve();
    }
    return mongoose.connect(encodeMongoURI(uri) , {useNewUrlParser: true}).then(db => {
        isConnected = db.connections[0].readyState;
    }).catch(e => {
        console.log("DB Connection Error", e)
    });
};