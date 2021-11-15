let log_out = (app) => {
    app.route('/log_out')
        .get( (req, res)=>{
            req.session.destroy((error) => {
                if (error) res.status(500).json(err);
                res.redirect('/');
            });
        })
}
module.exports = log_out;