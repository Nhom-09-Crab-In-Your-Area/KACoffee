
const express = require('express')

module.exports = (app)=> {  
    app.use(express.json())
    app.use(express.urlencoded())
    app.route('/addUser')
        .post((req, res)=> {
            console.log(req.body);
            console.log(typeof(req.body));
            res.end();
        }
    )
};
