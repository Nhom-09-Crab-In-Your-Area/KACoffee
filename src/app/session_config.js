const _2hours = 1000 * 60 * 60 * 2;
let session = require('express-session');
let MongoDBStore = require('connect-mongodb-session')(session);
let config = require('../dbConfig/config');
const cookieParser = require('cookie-parser');
const shortid = require('shortid');

var store = new MongoDBStore({
    uri: config.url,
    collection: 'log_in_sessions'
});

//catch errors 
store.on('error', function(error) {
    console.log(error);
});

module.exports = (app) => {
    app.use(cookieParser());
    app.use(session({
        genid: function(req) {
            return shortid.generate();
        },
        secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
        saveUninitialized: false,
        cookie: { maxAge: _2hours,
                  //secure need to be set to true when implement
                  secure: false,
                  UserType: 'Guest', // guest until  login
                  UserEmail: null, //should contain email
                },
        resave: true,
        store: store,
        

    }));
    

}


