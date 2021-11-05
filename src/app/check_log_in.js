const express = require('express');


module.exports =(app)=> {  
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.route('/checkLogin')
        .post((req, res)=> {
            try{
                //insert Users collection

                //insert Authentication collection 
                
                
            }
            catch (err){
                res.status(500).send(error);
            }
            res.end();
        }
    )
};
