module.exports = function requireAuth(req, res, next) {
    if (req.user == undefined) //if user is not logged in
        res.render('auth-needed');
    else
        next();
};