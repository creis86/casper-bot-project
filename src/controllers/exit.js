module.exports.exit = (app, req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
};
