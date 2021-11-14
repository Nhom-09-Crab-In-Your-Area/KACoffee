let log_out = (app) => {
    app.route('/log_out')
        .post( (req, res)=>{
            req.session.destroy((error) => {
                if (error) throw error;
                res.redirect('/');
            });
        })
}
module.exports = log_out;