const withAuth = (req, res, next) => {
    // when user isn't logged in, redirects to login page
    if (!req.session.logged_in) {
        res.redirect('/login');
    } else {
        next();
    }
};

module.exports = withAuth;