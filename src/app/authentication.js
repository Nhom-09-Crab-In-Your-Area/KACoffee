const sessions = require('./session_config');
const session_store = sessions.session_store;


module.exports = (app) =>{
    app.use((req, res,next) =>{
        
        session_store.get(req.session.id, (err, session) => {
            if (err) throw err;
            if (session.UserEmail != req.session.UserEmail) {
                res.sendStatus(400);
            }
            else{
                session_store.touch(req.session.id);
                next();
            }
        })
    })
}

